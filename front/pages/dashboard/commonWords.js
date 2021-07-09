import React, { useState, useContext, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import Navigation from '../../components/Navigation';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import https from 'https';

const width = 400;
const height = 400;

import WordCloud from '../../components/WordCloud';

const CommonWords = () => {
	const { chatData, loadData } = useContext(UserContext);

	const [name1, setName1] = useState('');
	const [name2, setName2] = useState('');
	const [words, setWords] = useState([]);
	useEffect(() => {
		if (chatData === null) {
			loadData();
		} else if (!name1 && !name2 && chatData !== null) {
			axios.create({
				httpsAgent: new https.Agent({ keepAlive: true })
			});
			axios.post('/api/commonWords', chatData)
				.then(res => {
					const data = res.data;
					console.log(data);
					setWords(data);
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
				</Flex>
				{name1 && (
					<Flex flexDir="column">
						<Flex
							flexDir="rows"
							mt={100}
							mb={100}
							paddingY="2vh"
							fontSize="2xl"
						>
							<Text fontWeight="bold" mr={5}>
								👧 {name1}
							</Text>
							<Text>님</Text>
						</Flex>
						<WordCloud />
					</Flex>
				)}
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
				{name2 && (
					<Flex flexDir="column">
						<Flex
							flexDir="rows"
							mt={100}
							mb={100}
							paddingY="2vh"
							fontSize="2xl"
						>
							<Text fontWeight="bold" mr={5}>
								👦 {name2}
							</Text>
							<Text>님</Text>
						</Flex>
						<WordCloud />
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default CommonWords;
