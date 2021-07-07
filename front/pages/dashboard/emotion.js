import React, { useState, useContext } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import LineChart from '../../components/LineChart';
import Navigation from '../../components/Navigation';
import UserContext from '../../components/UserContext';

const ChatReport = () => {
	const [fileData, setFileData] = useState(null);
	const { chatData, resetData } = useContext(UserContext);
	const { total_text, firstDate, lastDate, df_user, df_month, df_hour } =
		chatData;

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

				<Flex flexDir="column" mt={100} mb={100}>
					<Text marginY="2vh" fontSize="2xl">
						📅 2021년 동안 주고 받은 카톡 횟수
					</Text>
					<LineChart data={{ df_month }} />
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
				<Flex flexDir="column" mt={100} mb={100}>
					<Text marginY="2vh" fontSize="2xl">
						⏱ 시간대별 카톡 주고 받은 횟수
					</Text>
					<LineChart
						labels={Object.values(df_month.year_month)}
						data={Object.values(df_month.Message)}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ChatReport;
