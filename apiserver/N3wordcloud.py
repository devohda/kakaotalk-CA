import os
import sys
import re

import numpy as np
import pandas as pd

import json

import matplotlib.pyplot as plt
%matplotlib inline
import seaborn as sns
sns.set(style='white', context='notebook', palette='deep')

from collections import Counter

data = pd.read_csv("전처리된 파일 경로")
#pororo 패키지 설치해야함

from wordcloud import WordCloud #워드클라우드 시각화
from pororo import Pororo #형태소 분석
from collections import Counter #컨테이너에 동일한 값 몇개인지

data.dropna(inplace=True) #결측값 빼기
data.reset_index(drop=True,inplace=True)

#word - pororo감성분석
word = []
tk = Pororo(task="tokenization", lang="ko", model = "word") #감성분석 모델
for i in range(len(data)):
  token= tk(data["preprocessed"][i])
  token = ' '.join(token)
  word.append(token)


#font설치하기
#!apt-get update -qq
#!apt-get install fonts-nanum* -qq

#wordcloud 그리기
text = ' '.join(word)

#wordcloud 색상 커스텀
def color_func(word, font_size, position,orientation,random_state=None, **kwargs):
    return("hsl({:d},{:d}%, {:d}%)".format(np.random.randint(212,313),np.random.randint(26,32),np.random.randint(45,80)))

# 가장 많이 나온 단어부터 40개를 저장한다.
counts = Counter(text.split())
tags = counts.most_common(70) 


# WordCloud를 생성한다.
# 한글을 분석하기위해 font를 한글로 지정해주어야 된다. macOS는 .otf , window는 .ttf 파일의 위치를
# 지정해준다. (ex. '/Font/GodoM.otf')
wc = WordCloud(font_path='/content/drive/MyDrive/Project/kakao_TextAnalysis/font/BMJUA_otf.otf',background_color="white", color_func=color_func ,max_font_size=100)
cloud = wc.generate_from_frequencies(dict(tags))

# 생성된 WordCloud를 test.jpg로 보낸다.
cloud.to_file('test.jpg')