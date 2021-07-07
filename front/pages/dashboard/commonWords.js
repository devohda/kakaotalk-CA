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

const CommonWords = () => {
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
				w="41%"
				p="3%"
				flexDir="column"
				overflow="auto"
				minH="100vh"
			>
				<Flex h="5vh">
					<Heading
						fontWeight="normal"
						mb={4}
						letterSpacing="tight"
					>
						우리의 채팅 통계
					</Heading>
				</Flex>

				<Flex flexDir="column" mt={100} mb={100}>
					<Text marginY="2vh" fontSize="2xl">
						📅 2021년 동안 주고 받은 카톡 횟수
					</Text>
					<MyChart />
				</Flex>
			</Flex>

			{/*column 3*/}
			<Flex
				flexDir="column"
				w="41%"
				bg="#f5f5f5"
				p="3%"
				overflow="auto"
				minH="100vh"
			>
				<Flex h="5vh"></Flex>
				<Flex flexDir="column" mt={100} mb={100}>
					<Text marginY="2vh" fontSize="2xl">
						⏱ 시간대별 카톡 주고 받은 횟수
					</Text>
					<MyChart />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CommonWords;
