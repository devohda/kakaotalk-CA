import React, { useState, useContext, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import LineChart from '../../components/LineChart';
import Navigation from '../../components/Navigation';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import Router from 'next/router';

const Emotion = () => {
	const [fileData, setFileData] = useState(null);
	const { chatData, resetData } = useContext(UserContext);

	const [name1, setName1] = useState('');
	const [name2, setName2] = useState('');

	useEffect(() => {
		if (!name1 && !name2 && chatData !== null) {
			axios.post('/api/commonWords', chatData)
				.then(res => {
					const data = res.data;
					const users = Object.keys(data.df_user);
					setName1(users[0]);
					setName2(users[1]);
				})
				.catch(err => console.log(err));
		}
	});

	return (
		<Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
			{/*column 1*/}
			<Navigation />

			{/*column 2*/}
			<Flex
				w="42%"
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
						우리가 주로 사용하는 말
					</Heading>
					{name1 && <Flex>{name1}</Flex>}
				</Flex>
			</Flex>

			{/*column 3*/}
			<Flex
				flexDir="column"
				w="42%"
				bg="#f5f5f5"
				p="3%"
				overflow="auto"
				minH="100vh"
			>
				<Flex h="5vh"></Flex>
				{name2 && <Flex>{name2}</Flex>}
			</Flex>
		</Flex>
	);
};

export default Emotion;
