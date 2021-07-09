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
from wordcloud import WordCloud #워드클라우드 시각화


app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록

def time_24(t):
    time = {"밤":[22,23,0,1],"새벽":[2,3,4,5],"오전":[6,7,8,9],"낮":[10,11,12,13],
        "오후":[14,15,16,17],"저녁":[18,19,20,21]}
    for when, hour in time.items():
        if t in hour:
            break
    return when

def color_func(word, font_size, position,orientation,random_state=None, **kwargs):
    return("hsl({:d},{:d}%, {:d}%)".format(np.random.randint(212,313),np.random.randint(26,32),np.random.randint(45,80)))


@api.route('/')
class Hello(Resource):
    def get(self):
        return {
            "hello": "world"
        }

@api.route('/chatReport')
class ChatReport(Resource):
    def post(self):
        #requset는 json 형태로 반환됨
        parsed_request = request.get_json()
        data = pd.DataFrame(parsed_request)

        #0. 전체 대화 개수 ->따로 화면에 띄워줄 예정
        total_text = len(data)

        #0-1. 파일내 대화시작날짜, 대화 마지막 날짜 ->따로 화면에 띄워줄 예정
        firstDate = data.Date[0]
        lastDate = data.Date[total_text-1]

        #0-2. 사용자별로 대화 개수 -> 따로 화면에 띄워줄 예정
        df_user = data.groupby("User")["Message"].count().to_dict()

        #1. 2021년 대화개수 비교
        df_2021 = data[data.Date.str[:4] == "2021"] #2021년 대화만 남기기
        year_month = df_2021.Date.str[:7] #year,month부분만 문자열 자르기
        df_2021["year_month"] = year_month

        df_month = df_2021.groupby(["year_month"]).count().reset_index()
        df_month = df_month[["year_month","Message"]].to_dict() #df_month를 시각화하면 됩니당!

        #2. 우리는 24시간중 언제 대화를 많이 할까?
        data["date"] = data.Date.str[:10]
        data["hour"] = data.Date.str[11:13].astype(int)
        data["timeslot"] = data["hour"].apply(time_24)
        df_hour = data.groupby(["date","timeslot"]).count().reset_index() #하루 timeslot별로 count
        df_hour = df_hour.groupby(["timeslot"])["Message"].mean().astype(int).to_dict() #timeslot기준으로 평균값 -> 시각화하면됩니당!

        return {
         "total_text" : total_text,
         "firstDate" : firstDate,
         "lastDate" : lastDate,
         "df_user" : df_user,
         "df_month" : df_month,
         "df_hour" : df_hour
        }


@api.route('/commonWords')
class CommonWords(Resource):
    def post(self):
        data.dropna(inplace=True) #결측값 빼기
        data.reset_index(drop=True,inplace=True)

        word = []
        tk = Pororo(task="tokenization", lang="ko", model = "word")
        for i in range(len(data)):
          token= tk(data["preprocessed"][i])
          token = ' '.join(token)
          word.append(token)

        text = ' '.join(word)
        stopwords = ['ㅋㅋ','ㅋ','는데','에서','해서','거든','어서','이거','거야','했는데','하는','그래','그러면','같은','같아']
        text = [t for t in text.split() if t not in stopwords and len(t)>1]
        text = ' '.join(text)

        text = ' '.join(word)
        counts = Counter(text.split())
        tags = counts.most_common(70)

        print(tags)

        return {"success": "success"}


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)