import React, { useState } from 'react';
import {
	Flex,
	Heading,
	Avatar,
	AvatarGroup,
	Text,
	Icon,
	IconButton,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Divider,
	Link,
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	FormControl,
	FormLabel
} from '@chakra-ui/react';
import {
	FiHome,
	FiPieChart,
	FiDollarSign,
	FiBox,
	FiCalendar,
	FiChevronDown,
	FiChevronUp,
	FiPlus,
	FiCreditCard,
	FiSearch,
	FiBell
} from 'react-icons/fi';
import MyChart from '../../components/MyChart';

const Dashboard = () => {
	const [file, setFile] = useState(null);

	const uploadToClient = event => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];
			setFile(i);
		}
	};

	const uploadToServer = async event => {
		const body = new FormData();
		body.append('file', file);
		const response = await fetch('/api/file', {
			method: 'POST',
			body
		});
	};

	return (
		<Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
			{/*column 1*/}
			<Flex
				w="15%"
				flexDir="column"
				alignItems="center"
				backgroundColor="#F6B352"
				color="#fff"
			>
				<Flex
					flexDir="column"
					justifyContent="space-between"
					h="100vh"
				>
					<Flex flexDir="column" as="nav">
						<Heading
							mt={50}
							mb={100}
							fontSize="4xl"
							alignSelf="center"
						>
							Talk Traker.
						</Heading>
						<Flex
							flexDir="column"
							align="flex-start"
							justifyContent="center"
						>
							<Flex className="sidebar-items">
								<Link href="/dashboard/home">
									<Icon
										as={FiHome}
										fontSize="2xl"
										className="active-icon"
									/>
								</Link>
								<Link
									href="/dashboard/home"
									_hover={{ textDecor: 'none' }}
								>
									<Text className="active">
										Home
									</Text>
								</Link>
							</Flex>
							<Flex className="sidebar-items">
								<Link href="/dashboard/analyze">
									<Icon as={FiHome} fontSize="2xl" />
								</Link>
								<Link
									href="/dashboard/analyze"
									_hover={{ textDecor: 'none' }}
								>
									<Text>analyze1</Text>
								</Link>
							</Flex>
							<Flex className="sidebar-items">
								<Link href="/dashboard/analyze">
									<Icon as={FiHome} fontSize="2xl" />
								</Link>
								<Link
									href="/dashboard/analyze"
									_hover={{ textDecor: 'none' }}
								>
									<Text>analyze2</Text>
								</Link>
							</Flex>
							<Flex className="sidebar-items">
								<Link href="/dashboard/analyze">
									<Icon as={FiHome} fontSize="2xl" />
								</Link>
								<Link
									href="/dashboard/analyze"
									_hover={{ textDecor: 'none' }}
								>
									<Text>analyze3</Text>
								</Link>
							</Flex>
						</Flex>
					</Flex>
					<Flex
						flexDir="column"
						alignItems="center"
						mb={10}
						mt={5}
					>
						<Avatar my={2} src="../photo.jpg" />
						<Text textAlign="center">OH DAHYE</Text>
					</Flex>
				</Flex>
			</Flex>

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
							{file != null
								? file.name
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
					mt="1vh"
					textAlign="center"
					alignSelf="center"
					onClick={uploadToServer}
				>
					분석하기
				</Button>
			</Flex>

			{/*column 3*/}
			<Flex w="35%" bg="#f5f5f5" p="3%" overflow="auto"></Flex>
		</Flex>
	);
};

export default Dashboard;
