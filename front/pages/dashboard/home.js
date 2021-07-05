import React, { useState } from 'react';
import {
	Flex,
	Heading,
	Text,
	Button,
	Input,
	FormControl,
	FormLabel
} from '@chakra-ui/react';
import MyChart from '../../components/MyChart';
import MyChart2 from '../../components/MyChart2';
import MyChart3 from '../../components/MyChart3';
import MyChart4 from '../../components/MyChart4';
import Navigation from '../../components/Navigation';

const Dashboard = () => {
	const [fileData, setFileData] = useState(null);

	const uploadToClient = event => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];
			setFileData(i);
		}
	};

	const uploadToServer = async event => {
		if (fileData) {
			const body = new FormData();
			body.append('file', fileData);
			const response = await fetch('/api/file', {
				method: 'POST',
				body
			});
		} else {
			alert('파일을 선택하세요.');
		}
	};

	return (
		<Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
			{/*column 1*/}
			<Navigation />

			{/*column 2*/}
			<Flex
				w="55%"
				p="3%"
				flexDir="column"
				overflow="auto"
				minH="100vh"
			>
				<Heading fontWeight="normal" mb={4} letterSpacing="tight">
					Welcome back,{' '}
					<Flex fontWeight="bold" display="inline-flex">
						Dahye
					</Flex>
				</Heading>
				<FormControl
					w="50%"
					h="5vh"
					mt="5vh"
					mb="1vh"
					alignSelf="center"
				>
					<Flex w="100%" h="100%">
						<FormLabel
							className="talk-data"
							w="100%"
							h="100%"
							lineHeight="5vh"
							m="0"
							textAlign="center"
							alignSelf="center"
						>
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
					w="50%"
					h="5vh"
					lineHeight="5vh"
					mt="1vh"
					textAlign="center"
					alignSelf="center"
					onClick={uploadToServer}
				>
					분석하기
				</Button>
				<Flex flexDir="column" mt={100} mb={100}>
					<Text marginY="2vh" fontSize="2xl">
						분석 결과
					</Text>
					<MyChart />
				</Flex>
			</Flex>

			{/*column 3*/}
			<Flex
				flexDir="column"
				w="35%"
				bg="#f5f5f5"
				p="3%"
				overflow="auto"
			>
				<Flex flexDir="column" marginY="5%" marginX="auto">
					<Text marginY={3} fontWeight="bold" fontSize="2xl">
						분석 1
					</Text>
					<Flex flexDir="row" w="80%" alignItems="center">
						<MyChart2 />
					</Flex>
				</Flex>
				<Flex flexDir="column" marginY="5%" marginX="auto">
					<Text marginY={3} fontWeight="bold" fontSize="2xl">
						분석 2
					</Text>
					<Flex flexDir="row" w="80%" alignItems="center">
						<MyChart3 />
					</Flex>
				</Flex>
				<Flex flexDir="column" marginY="5%" marginX="auto">
					<Text marginY={3} fontWeight="bold" fontSize="2xl">
						분석 3
					</Text>
					<Flex flexDir="row" w="80%" alignItems="center">
						<MyChart4 />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Dashboard;
