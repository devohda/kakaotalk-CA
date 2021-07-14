import React, { useState, useContext, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import Navigation from '../../components/Navigation';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import Table from '../../components/Table';

const LoveCalc = () => {
	const { chatData, name1, name2, loadData } = useContext(UserContext);
	const [hour, setHour] = useState(null);
	const [hourYou, setHourYou] = useState(null);
	const [min, setMin] = useState(null);
	const [minYou, setMinYou] = useState(null);
	const [mePosProp, setMePosProp] = useState(null);
	const [meNegProp, setMeNegProp] = useState(null);
	const [youNegProp, setYouNegProp] = useState(null);
	const [youPosProp, setYouPosProp] = useState(null);

	useEffect(() => {
		if (!chatData) {
			loadData();
		} else {
			axios.post(
				'http://34.146.140.41:5000/loveCalc',
				JSON.parse(chatData),
				{
					timeout: 5000000
				}
			)
				.then(res => {
					const data = res.data;
					const {
						hour,
						hour_you,
						me_neg_prop,
						me_pos_prop,
						min,
						min_you,
						you_neg_prop,
						you_pos_prop
					} = data;
					setHour(hour);
					setHourYou(hour_you);
					setMeNegProp(me_neg_prop);
					setMePosProp(me_pos_prop);
					setMin(min);
					setMinYou(min_you);
					setYouNegProp(you_neg_prop);
					setYouPosProp(you_pos_prop);
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
				w="80%"
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
						우리의 애정 척도 ❤️
					</Heading>
				</Flex>
				<Flex
					w="100%"
					h="100%"
					alignItems="center"
					flexDir="column"
				>
					{youPosProp && (
						<Table
							names={{ name1, name2 }}
							data={[
								{
									title: '😊 긍정적인 대화 비율',
									percent1:
										(mePosProp * 100).toFixed(1) +
										'%',
									percent2:
										(youPosProp * 100).toFixed(
											1
										) + '%'
								},
								{
									title: '😥 부정적인 대화 비율',
									percent1:
										(meNegProp * 100).toFixed(1) +
										'%',
									percent2:
										(youNegProp * 100).toFixed(
											1
										) + '%'
								},
								{
									title: '💌 평균 답장 시간',
									percent1: `${hour.toFixed(
										0
									)} 시간 ${min.toFixed(1)} 분`,
									percent2: `${hourYou.toFixed(
										0
									)} 시간 ${minYou.toFixed(1)} 분`
								}
							]}
						/>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default LoveCalc;
