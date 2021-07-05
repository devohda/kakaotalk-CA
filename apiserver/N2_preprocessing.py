import os
import sys
import re

import numpy as np
import pandas as pd

import json


def kakao_text_preprocessing(data):  
  stopwords = '이 있 하 것 들 그 수 이 않 없 나 사람 주 아니 등 같 때 고 년 가 한 지 대하 오 말 일 그렇 위하 은 는 함 음 심 습니다 아요 세요 에요 었 였 에 을 를'.split() 
  
  #한글
  import re
  korean = re.sub("[^ㄱ-ㅎㅏ-ㅣ가-힣]"," ",data) 

  #띄어쓰기, 맞춤법
  from hanspell import spell_checker
  spelled_sent = spell_checker.check(korean)
  hanspell_sent = spelled_sent.checked

  #정규화
  from soynlp.normalizer import repeat_normalize
  hanspell_sent = repeat_normalize(hanspell_sent)

  #토큰화와 불용어
  from konlpy.tag import Mecab
  mecab = Mecab() 
  tokenization = mecab.morphs(hanspell_sent)
  no_stopwords = [token for token in tokenization if token not in stopwords]
    
  return ' '.join(no_stopwords)

#멀티프로세싱으로 시간 단축
from multiprocessing import Pool
 
def use_multiprocess(func, iter, workers):
    pool = Pool(processes=workers)
    result = pool.map(func, iter)
    pool.close()
    return result

#전처리완료
data = pd.read_csv("data/text_hun.csv")
preprocessed = use_multiprocess(kakao_text_preprocessing, data["Message"], 3)
data["preprocessed"] = preprocessed
data.to_csv("content/drive/MyDrive/Project/kakao_TextAnalysis/data/text_hun_preprocessed.csv")