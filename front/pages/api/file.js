import formidable from 'formidable';
import fs from 'fs';
import axios from 'axios';

export const config = {
	api: {
		bodyParser: false
	}
};

// 숫자를 받아서 width 길이 만큼 앞자리에 0을 추가하여 string으로 반환하는 함수
function fillZero(str, width) {
	return str.length >= width
		? str
		: new Array(width - str.length + 1).join('0') + str; //남는 길이만큼 0으로 채움
}

const txtToJSON = txt_file => {
	const jsonArray = [];

	// binary 형식을 문자열로 바꾸고 한 줄씩 잘라 배열 생성
	const rows = txt_file.toString().split('\r\n');

	// 반복문 돌면서 날짜, 작성자, 대화 내용 포멧으로 JSON 객체 만들기
	let chatDate;
	rows.forEach(str => {
		if (str.substr(0, 15) === '---------------') {
			//날짜 추출
			// txt 파일은 ---------------날짜--------------- 의 형태로 날짜가 주어지고, 그 뒤에 발화자, 시간, 내용으로 나옴
			// 다음 날이 되기 전까지 같은 일자이므로 날짜 저장변수(chatDate)에 저장해놓음
			const cuttingstr = str.split(' ');
			const year = cuttingstr[1].substr(0, 4);
			const month = cuttingstr[2].substr(0, cuttingstr[2].length - 1);
			const day = cuttingstr[3].substr(0, cuttingstr[3].length - 1);

			chatDate =
				fillZero(year, 4) +
				'-' +
				fillZero(month, 2) +
				'-' +
				fillZero(day, 2);
		} else {
			if (str[0] === '[') {
				// 발화자, 시간, 내용 추출
				// 발화자 추출
				const user = str.substr(1, str.indexOf(']') - 1);
				str = str.substr(str.indexOf(']') + 2);

				// 시간 추출
				// csv 파일과 형식을 맞추기 위해 YYYY-MM-DD 00:00:00 의 형태로 만들기
				const time = str
					.substr(str.indexOf('[') + 1, str.indexOf(']') - 1)
					.split(/ |:/);

				time[1] = Number(time[1]);
				time[2] = Number(time[2]);
				if (time[0] === '오후') time[1] += 12;

				const timeData =
					fillZero(String(time[1]), 2) +
					':' +
					fillZero(String(time[2]), 2) +
					':00';
				const date = `${chatDate} ${timeData}`;

				// 내용 추출
				const message = str.substr(str.indexOf(']') + 2);

				// JSON 형식으로 만들기
				jsonArray.push({
					Date: date,
					User: user,
					Message: message
				});
			}
		}
	});

	return jsonArray;
};

const csvToJSON = csv_file => {
	// binary 형식을 문자열로 바꾸고 한 줄씩 잘라 배열 생성
	const rows = csv_file.toString().split('\r\n');

	// 가장 첫 번째 줄에 ',' 을 기준으로 데이터 제목이 있으므로 추출 (ex. '이름','시간','나이')
	const header = rows[0].split(',');

	// ',' 을 기준으로 데이터 분리시켜서 object 만든 후 배열에 넣어 JSON 형식으로 만들기
	const jsonArray = [];
	for (let i = 1; i < rows.length; i++) {
		let obj = {};
		let row = rows[i].split(',');
		for (let j = 0; j < header.length; j++) {
			obj[header[j]] = row[j];
		}
		jsonArray.push(obj);
	}

	return jsonArray;
};

const convertFile = async file => {
	// 파일 읽기
	const fileData = fs.readFileSync(file.path);

	// 파일 확장자 찾기
	const fileName = file.name;
	const fileNameSplit = fileName.split('.');
	const fileExtension = fileNameSplit[fileNameSplit.length - 1];

	// 확장자에 따라서 .txt, .csv 파일을 JSON 객체로 변환
	let jsonData;
	switch (fileExtension) {
		case 'txt':
			jsonData = txtToJSON(fileData);
			break;
		case 'csv':
			jsonData = csvToJSON(fileData);
			break;
		default:
			break;
	}

	await fs.unlinkSync(file.path);
	return jsonData;
};

const post = async (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, async (err, fields, files) => {
		const jsonData = await convertFile(files.file);

		const result = await axios.post(
			'http://localhost:5000/analyze',
			jsonData
		);
		return res.send(result.data);
	});
};

const sendJSONData = async (req, res) => {};

export default (req, res) => {
	switch (req.method) {
		case 'POST':
			return new Promise((resolve, reject) => {
				post(req, res);
			});
		case 'PUT':
			console.log('PUT');
			return;
		case 'DELETE':
			console.log('DELETE');
			return;
		case 'GET':
			console.log('GET');
			return;
		default:
			res.status(404).send('');
			return;
	}
};
