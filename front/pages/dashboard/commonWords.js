import React, { useState, useContext, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import Navigation from '../../components/Navigation';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import WordCloud from '../../components/WordCloud';

const CommonWords = () => {
	const { chatData, name1, name2, loadData } = useContext(UserContext);
	const [words1, setWords1] = useState(null);
	const [words2, setWords2] = useState(null);
	useEffect(async () => {
		if (!chatData) {
			loadData();
		} else {
			axios.post('/api/commonWords', JSON.parse(chatData))
				.then(res => {
					const data = res.data;
					console.log(data);
					const tags_me = data.tags_me;
					const tags_you = data.tags_you;

					console.log(tags_me[0]);

					const cloudData1 = tags_me.map(tag => {
						const hundred = parseInt(Number(tag[1]) / 100);
						return {
							key: tag[0],
							value: String(Number(tag[1]) - 100 * hundred)
						};
					});
					const cloudData2 = tags_you.map(tag => {
						const hundred = parseInt(Number(tag[1]) / 100);
						return {
							key: tag[0],
							value: String(Number(tag[1]) - 100 * hundred)
						};
					});

					setWords1(cloudData1);
					setWords2(cloudData2);
				})
				.catch(err => console.log(`timeout : ${err}`));
		}
	}, [chatData]);

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
						{words1 && (
							<WordCloud words={words1} name={name1} />
						)}
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
						{words2 && (
							<WordCloud words={words2} name={name2} />
						)}
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default CommonWords;
