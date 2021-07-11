from flask import Flask, request  # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import

import os
import sys
import re

import numpy as np
import pandas as pd

import json

import matplotlib.pyplot as plt
import seaborn as sns

sns.set(style='white', context='notebook', palette='deep')

from pororo import Pororo
from collections import Counter
from wordcloud import WordCloud  # 워드클라우드 시각화

# 멀티프로세싱으로 시간 단축
from multiprocessing import Pool

from flask_cors import CORS

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
CORS(app)
api = Api(app)  # Flask 객체에 Api 객체 등록


def color_func(word, font_size, position, orientation, random_state=None, **kwargs):
    return ("hsl({:d},{:d}%, {:d}%)".format(np.random.randint(212, 313), np.random.randint(26, 32),
                                            np.random.randint(45, 80)))


@api.route('/')
class Hello(Resource):
    def get(self):
        return {
            "hello": "world"
        }


def kakao_text_preprocessing(data):
    stopwords = '이 있 하 것 들 그 수 이 않 없 나 사람 주 아니 등 같 때 고 년 가 한 지 대하 오 말 일 그렇 위하 은 는 함 음 심 습니다 아요 세요 에요 었 였 에 을 를'.split()

    # 한글
    import re
    korean = re.sub("[^ㄱ-ㅎㅏ-ㅣ가-힣]", " ", data)

    # 띄어쓰기, 맞춤법
    from hanspell import spell_checker
    try:
        spelled_sent = spell_checker.check(korean)
        hanspell_sent = spelled_sent.checked
    except:
        hanspell_sent = korean

    # 정규화
    from soynlp.normalizer import repeat_normalize
    try:
        normalized_sent = repeat_normalize(hanspell_sent)
    except:
        normalized_sent = hanspell_sent

    return normalized_sent


# 멀티프로세싱으로 시간 단축
from multiprocessing import Pool


def use_multiprocess(func, iter, workers):
    pool = Pool(processes=workers)
    result = pool.map(func, iter)
    pool.close()
    return result


# 전처리 하기
@api.route('/preprocessing')
class Preprocessing(Resource):
    def post(self):
        # txt, csv 파일 json 으로 바꾼 데이터 받기
        parsed_request = request.get_json()
        data = pd.DataFrame(parsed_request)

        # 전체 대화 개수
        total_text = len(data)

        # 파일내 대화시작날짜, 대화 마지막 날짜
        firstdate = data.Date[0]
        lastdate = data.Date[total_text - 1]

        # 사용자별로 대화 개수
        df_user = data.groupby("User")["Message"].count().to_dict()

        # 전처리함수, 데이터에서 적용할 컬럼, workers 수
        data = data[data.Date.str[:4] == "2021"]  # 2021년 대화만 남기기
        preprocessed = use_multiprocess(kakao_text_preprocessing, data["Message"], 3)
        data["preprocessed"] = preprocessed

        result = {
            "firstdate": firstdate,
            "lastdate": lastdate,
            "df_user": df_user,
            "data": data.to_json(orient='records', force_ascii=False)
        }
        return result


def time_24(t):
    time = {"밤": [22, 23, 0, 1], "새벽": [2, 3, 4, 5], "오전": [6, 7, 8, 9], "낮": [10, 11, 12, 13], "오후": [14, 15, 16, 17],
            "저녁": [18, 19, 20, 21]}
    for when, hour in time.items():
        if t in hour:
            return when


@api.route('/chatReport')
class ChatReport(Resource):
    def post(self):
        # request 는 json 형태로 반환됨
        parsed_request = request.get_json()
        data = pd.DataFrame(parsed_request)

        # 1. 2021년 대화개수 비교
        df_2021 = data[data.Date.str[:4] == "2021"]  # 2021년 대화만 남기기
        year_month = df_2021.Date.str[:7]  # year,month 부분만 문자열 자르기
        df_2021["year_month"] = year_month

        df_month = df_2021.groupby(["year_month"]).count().reset_index()
        df_month = df_month[["year_month", "Message"]].to_dict()

        # 2. 우리는 24시간중 언제 대화를 많이 할까?
        data["date"] = data.Date.str[:10]
        data["hour"] = data.Date.str[11:13].astype(int)
        data["timeslot"] = data["hour"].apply(time_24)
        df_hour = data.groupby(["date", "timeslot"]).count().reset_index()  # 하루 timeslot 별로 count
        df_hour = df_hour.groupby(["timeslot"])["Message"].mean().astype(int).to_dict()  # timeslot 기준으로 평균값

        return {
            "df_month": df_month,
            "df_hour": df_hour
        }


@api.route('/commonWords')
class CommonWords(Resource):
    def post(self):
        # request 는 json 형태로 반환됨
        parsed_request = request.get_json()
        data = pd.DataFrame(parsed_request)

        data.dropna(inplace=True)  # 결측값 빼기
        data.reset_index(drop=True, inplace=True)

        user = data.User.unique()
        df_me = data[data.User == user[0]].reset_index(drop=True)
        df_you = data[data.User == user[1]].reset_index(drop=True)

        word_me = []
        word_you = []

        tk = Pororo(task="tokenization", lang="ko", model="word")
        stopwords = ['ㅋㅋ', 'ㅋ', '는데', '에서', '해서', '거든', '어서', '이거', '거야', '했는데', '하는', '그래', '그러면', '같은', '같아']
        for i in range(len(df_me)):
            token = tk(df_me["preprocessed"][i])
            token = ' '.join(token)
            word_me.append(token)

        text_me = ' '.join(word_me)

        text_me = [t for t in text_me.split() if t not in stopwords and len(t) > 1]
        text_me = ' '.join(text_me)

        text_me = ' '.join(word_me)
        counts = Counter(text_me.split())
        tags_me = counts.most_common(50)

        for i in range(len(df_you)):
            token = tk(data["preprocessed"][i])
            token = ' '.join(token)
            word_you.append(token)

        text_you = ' '.join(word_you)
        text_you = [t for t in text_you.split() if t not in stopwords and len(t) > 1]
        text_you = ' '.join(text_you)

        text_you = ' '.join(word_you)
        counts = Counter(text_you.split())
        tags_you = counts.most_common(30)

        return {
            "tags_me": tags_me,
            "tags_you": tags_you
        }


# 평균 답장시간
from datetime import datetime


def reply_time(df):  # 평균답장시간 구하는 함수
    diff = []
    for i in range(len(df) - 1):
        before = datetime.strptime(df["Date"][i], "%Y-%m-%d %H:%M:%S")
        after = datetime.strptime(df["Date"][i + 1], "%Y-%m-%d %H:%M:%S")

        diff_ = after - before
        diff.append(diff_.seconds)  # 시간차이를 'seconds' 단위로 저장
    mean_diff = np.mean(diff)  # 시간 차이 평균값
    hour = mean_diff / 3600
    min = (mean_diff % 3600) / 60
    return hour, min


def make_sentiment(data, sa):  # 감성분석 결과를 새로운 데이터프레임으로 다시 만들어줌
    df_sentiment = pd.DataFrame(columns=["positive", "negative"])  # 1100개 -> 1분27초
    for i in range(len(data)):
        temp = sa(data["preprocessed"][i], show_probs=True)
        df_sentiment = df_sentiment.append(temp, ignore_index=True)
    df = pd.concat([data, df_sentiment], axis=1)
    return df


def pos_neg(df):  # 긍정, 부정 결과만 데이터프레임을 새로 만들어줌
    df_pos = df[df["positive"] > 0.90]
    df_neg = df[df["negative"] > 0.90]
    return df_pos, df_neg


# 동사,형용사 원형 복원, 명사, 부사 추출
from khaiii import KhaiiiApi

khApp = KhaiiiApi()


def Morphology_analysis(sentence):
    morphs = []
    for word in khApp.analyze(sentence):
        for morph in word.morphs:

            # 동사(VV,VA)는 원형으로 바꾸기
            if morph.tag in verse:
                root = morph.lex + '다'
                if root not in stopwords_verse:  # 의미없는 동사원형(stopwords) 빼기
                    morphs.append(root)

            # 명사,부사,감탄사
            if morph.tag in pos and len(morph.lex) > 1 and morph.lex != "ㅋㅋ":
                morphs.append(morph.lex)
    result = ' '.join(morphs)
    return result


@api.route('/sentiment')
class Preprocessing(Resource):
    def post(self):
        # request 는 json 형태로 반환됨
        parsed_request = request.get_json()
        data = pd.DataFrame(parsed_request)

        data.dropna(inplace=True)
        data.reset_index(drop=True, inplace=True)

        sa = Pororo(task="sentiment", model="brainbert.base.ko.nsmc", lang="ko")  # Pororo 감성분석 모델
        df = data[data["Date"].str[:7] == '2021-06'].reset_index(drop=True)  # 2021-6월 대화만

        user = df.User.unique()
        df_me = df[df.User == user[0]].reset_index(drop=True)  # 유저1
        df_you = df[df.User == user[1]].reset_index(drop=True)  # 유저2

        hour, min = reply_time(df_me)  # 유저1의 평균 답장시간. 정수부분만 사용 -> ex. 0시간 7분 , 1시간 12분
        hour_you, min_you = reply_time(df_you)  # 유저2의 평균 답장시간. 정수 부분만 사용

        df_me = make_sentiment(df_me, sa)  # 유저1의 감성분석 결과
        df_you = make_sentiment(df_you, sa)  # 유저2의 감성분석 결과

        df_me_pos, df_me_neg = pos_neg(df_me)  # 유저1의 긍정, 부정 데이터프레임
        df_you_pos, df_you_neg = pos_neg(df_you)  # 유저2의 긍정, 부정 데이터프레임

        # 나와 상대방의 애정도 퍼센트
        me_pos_prop = len(df_me_pos) / len(df_me)  # 유저1의 긍정텍스트 퍼센트 -> 이 값을 사용하면 됩니다!!
        me_neg_prop = len(df_me_neg) / len(df_me)  # 유저1의 부정텍스트 퍼센트 -> 이 값을 사용하면 됩니다!!

        you_pos_prop = len(df_you_pos) / len(df_you)  # 유저2의 긍정텍스트 퍼센트 -> 이 값을 사용하면 됩니다!!
        you_neg_prop = len(df_you_neg) / len(df_you)  # 유저2의 부정텍스트 퍼센트 -> 이 값을 사용하면 됩니다!!

        df_me_pos["morphs"] = df_me_pos["preprocessed"].apply(Morphology_analysis)
        df_me_neg["morphs"] = df_me_neg["preprocessed"].apply(Morphology_analysis)

        df_you_pos["morphs"] = df_you_pos["preprocessed"].apply(Morphology_analysis)
        df_you_neg["morphs"] = df_you_neg["preprocessed"].apply(Morphology_analysis)

        # 유저1의 긍정적인 단어
        me_p_text = list(df_me_pos.morphs)  # 형태소 분석한것들 가져오기
        me_p_text = ' '.join(me_p_text)  # counter에 넣기전 처리
        count = Counter(me_p_text.split())  # 단어 개수 세는 counter~~~
        me_p_data = count.most_common(20).to_dict()  # 이거 딕셔너리 형태로 사용하면 됩니당!!!
        print(me_p_data)
        me_pos_word = pd.DataFrame(me_p_data, columns=["word", "count"])

        # 유저1의 부정적인 단어
        me_n_text = list(df_me_neg.morphs)
        me_n_text = ' '.join(me_n_text)
        count = Counter(me_n_text.split())
        me_n_data = count.most_common(20).to_dict()  # 이거 딕셔너리 형태로 사용하면 됩니당!!!
        me_neg_word = pd.DataFrame(me_n_data, columns=["word", "count"])

        # 유저2의 긍정적인 단어
        you_p_text = list(df_you_pos.morphs)
        you_p_text = ' '.join(you_p_text)
        count = Counter(you_p_text.split())
        you_p_data = count.most_common(20).to_dict()  # 이거 딕셔너리 형태로 사용하면 됩니당!!!
        you_p_word = pd.DataFrame(you_p_data, columns=["word", "count"])

        # 유저2의 부정적인 단어
        you_n_text = list(df_you_neg.morphs)
        you_n_text = ' '.join(you_n_text)
        count = Counter(you_n_text.split())
        you_n_data = count.most_common(20).to_dict()  # 이거 딕셔너리 형태로 사용하면 됩니당!!!
        you_n_word = pd.DataFrame(you_n_data, columns=["word", "count"])

        return {
            'hello': 'world'
        }


app.run(debug=True, host='0.0.0.0', port=5000)
