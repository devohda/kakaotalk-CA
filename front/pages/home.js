import React, { useState, useContext } from 'react';
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Image,
	Input
} from '@chakra-ui/react';
import UserContext from '../components/UserContext';
import axios from 'axios';

const Home = () => {
	const [fileData, setFileData] = useState(null);
	const { analyzeData } = useContext(UserContext);

	const uploadToClient = event => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];
			setFileData(i);
		}
	};

	const uploadToServer = event => {
		if (fileData) {
			const body = new FormData();
			body.append('file', fileData);
			fetch('/api/file', {
				method: 'POST',
				body
			})
				.then(res => res.json())
				.then(async data => {
					axios.post(
						'http://34.146.140.41:5000/preprocessing',
						data,
						{
							timeout: 500000
						}
					)
						.then(res => {
							const {
								firstdate,
								lastdate,
								df_user,
								data
							} = res.data;
							analyzeData(data);
						})
						.catch(err => console.log(`timeout : ${err}`));
				});
		} else {
			alert('파일을 선택하세요.');
		}
	};

	return (
		<div className="screen" position="relative">
			<Flex
				flexDir="column"
				alignItems="center"
				position="absolute"
				left="50%"
				transform="translate(-50%, 0%)"
			>
				<Flex
					h="100vh"
					maxW="2000px"
					flexDir="column"
					alignItems="center"
					w="20vw"
				>
					<Image src="/logo.png" w="13vw" mt="12vh" />
					<Flex
						w="80%"
						h="40vh"
						backgroundColor="#fff"
						borderRadius={5}
						boxShadow="0px 0px 20px 2px #dbdbdb"
					>
						<Flex
							w="100%"
							flexDir="column"
							alignItems="center"
							justifyContent="center"
						>
							<FormControl
								w="70%"
								h="5vh"
								mb="1.5vh"
								alignSelf="center"
							>
								<Flex w="100%" h="100%">
									<FormLabel className="talk-data">
										{fileData != null
											? fileData.name
											: '카카오톡 대화 파일 업로드 (.txt, .csv)'}
									</FormLabel>
									<Input
										type="file"
										onChange={uploadToClient}
										display="none"
									/>
								</Flex>
							</FormControl>
							<Button
								w="70%"
								h="5vh"
								lineHeight="5vh"
								mt="1.5vh"
								textAlign="center"
								alignSelf="center"
								onClick={uploadToServer}
								fontSize="13px"
							>
								분석하기
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Image
				h="100vh"
				src="/smartphone.png"
				position="absolute"
				left="50.55%"
				top="0%"
				transform="translate(-50%, 0%)"
				zIndex="-10"
			/>
		</div>
	);
};

export default Home;
