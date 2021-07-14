import React, { useState, useContext, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import LineChart from '../../components/LineChart';
import Navigation from '../../components/Navigation';
import UserContext from '../../components/UserContext';
import axios from 'axios';

const ChatReport = () => {
	const { chatData, loadData } = useContext(UserContext);

	const [dfMonth, setDfMonth] = useState(null);
	const [dfHour, setDfHour] = useState(null);

	useEffect(() => {
		if (!chatData) {
			loadData();
		} else {
			axios.post('/api/chatReport', JSON.parse(chatData))
				.then(res => {
					const data = res.data;
					setDfMonth(data.df_month);
					setDfHour(data.df_hour);
				})
				.catch(err => console.log(err));
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
						우리의 채팅 통계
					</Heading>
				</Flex>
				{dfMonth && (
					<Flex flexDir="column">
						<Flex
							flexDir="rows"
							mt={100}
							mb={100}
							paddingY="2vh"
							fontSize="2xl"
						>
							<Text fontWeight="bold" mr={5}>
								📅 2021년 동안 주고 받은 카톡 횟수
							</Text>
						</Flex>
						<LineChart
							labels={Object.values(dfMonth.year_month)}
							data={Object.values(dfMonth.Message)}
						/>
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
				{dfHour !== null && (
					<Flex flexDir="column">
						<Flex
							flexDir="column"
							mt={100}
							mb={100}
							paddingY="2vh"
							fontSize="2xl"
						>
							<Text fontWeight="bold" mr={5}>
								⏱ 시간대별 카톡 주고 받은 횟수
							</Text>
						</Flex>
						<LineChart
							labels={Object.keys(dfHour)}
							data={Object.values(dfHour)}
						/>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default ChatReport;
