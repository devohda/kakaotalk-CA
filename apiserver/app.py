from flask import Flask, request  # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
import numpy as np
import pandas as pd

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록


@api.route('/hello')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class HelloWorld(Resource):
    def post(self):
        #requset는 json 형태로 반환됨
        #print(request.is_json)
        parsed_request = request.get_json()

        return {"hello": "world!"}



@api.route('/total-text')
class TotalText(Resource):
    def get(self):

        data = ["hello","hello","hello"]
        total_text = len(data)
        return {"test" : "this is response"}


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)