import React, { useState, useContext, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import Navigation from '../../components/Navigation';
import UserContext from '../../components/UserContext';
import axios from 'axios';

import HorizontalBar from '../../components/HorizontalBar';

const Sentiment1 = () => {
	const { chatData, name1, name2, loadData } = useContext(UserContext);
	const [mePData, setMePData] = useState(null);
	const [youPData, setYouPData] = useState(null);

	useEffect(() => {
		if (!chatData) {
			loadData();
		} else {
			axios.post(
				'http://34.146.140.41:5000/sentiment1',
				JSON.parse(chatData),
				{
					timeout: 5000000
				}
			)
				.then(res => {
					const data = res.data;
					const { me_p_data, you_p_data } = data;
					setMePData(me_p_data);
					setYouPData(you_p_data);
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
						기분 좋을 때 사용하는 단어
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
						{mePData && (
							<HorizontalBar
								labels={mePData.map(data => data[0])}
								data={mePData.map(data => data[1])}
							/>
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
						{youPData && (
							<HorizontalBar
								labels={youPData.map(data => data[0])}
								data={youPData.map(data => data[1])}
							/>
						)}
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default Sentiment1;
