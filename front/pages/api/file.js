import formidable from 'formidable';
import fs from 'fs';

export const config = {
	api: {
		bodyParser: false
	}
};

function fillZero(str, width) {
	return str.length >= width
		? str
		: new Array(width - str.length + 1).join('0') + str; //남는 길이만큼 0으로 채움
}

const txtToJSON = txt_file => {
	/*파일 데이터 추출*/
	const chatData = [];

	const stringData = txt_file.toString().split('\r\n');
	let chatDate;
	stringData.forEach(str => {
		if (str.substr(0, 15) === '---------------') {
			//날짜 추출
			const cuttingstr = str.split(' ');
			const year = cuttingstr[1].substr(0, 4);
			const month = cuttingstr[2].substr(0, cuttingstr[2].length - 1);
			const day = cuttingstr[3].substr(0, cuttingstr[3].length - 1);

			chatDate = `${fillZero(year, 4)}-${fillZero(
				month,
				2
			)}-${fillZero(day, 2)}`;
		} else {
			if (str[0] === '[') {
				// 발화자, 시간, 내용 추출
				const user = str.substr(1, str.indexOf(']') - 1);
				str = str.substr(str.indexOf(']') + 2);

				const time = str
					.substr(str.indexOf('[') + 1, str.indexOf(']') - 1)
					.split(/ |:/);

				time[1] = Number(time[1]);
				time[2] = Number(time[2]);
				if (time[0] === '오후') time[1] += 12;

				const timeData = `${fillZero(
					String(time[1]),
					2
				)}:${fillZero(String(time[2]), 2)}:00`;
				const date = `${chatDate} ${timeData}`;

				const message = str.substr(str.indexOf(']') + 2);

				chatData.push({ Date: date, User: user, Message: message });
			}
		}
	});

	return chatData;
};

const csvToJSON = csv_file => {
	csv_file = csv_file.toString();

	const rows = csv_file.split('\r\n');
	const jsonArray = [];
	const header = rows[0].split(',');
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

const saveFile = async file => {
	const fileData = fs.readFileSync(file.path);

	const fileName = file.name;
	const fileNameSplit = fileName.split('.');
	const fileExtension = fileNameSplit[fileNameSplit.length - 1];

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
	return;
};

const post = async (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, async (err, fields, files) => {
		await saveFile(files.file);
		return res.status(201).send('');
	});
};

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
