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
	InputLeftElement
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

export default function dashboard() {
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
				<Button
					w="50%"
					h="5vh"
					m="5vh"
					bgColor="#fdc573"
					alignSelf="center"
				>
					<Flex flexDir="column">
						<Text>카카오톡 대화 파일 업로드</Text>
						<Text>(.txt, .csv)</Text>
					</Flex>
				</Button>
			</Flex>

			{/*column 3*/}
			<Flex w="35%" bg="#f5f5f5" p="3%" overflow="auto"></Flex>
		</Flex>
	);
}
