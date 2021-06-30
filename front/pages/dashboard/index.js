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
				<Flex flexDir="column" justifyContent="space-between" h="100vh">
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
								<Link>
									<Icon
										as={FiHome}
										fontSize="2xl"
										className="active-icon"
									/>
								</Link>
								<Link
                                    _hover={{textDecor : 'none'}}
                                >
									<Text className="active">Home</Text>
								</Link>
							</Flex>
							<Flex className="sidebar-items">
								<Link>
									<Icon
										as={FiHome}
										fontSize="2xl"
									/>
								</Link>
								<Link
									_hover={{textDecor : 'none'}}
								>
									<Text>Home</Text>
								</Link>
							</Flex>
							<Flex className="sidebar-items">
								<Link>
									<Icon
										as={FiHome}
										fontSize="2xl"
									/>
								</Link>
								<Link
									_hover={{textDecor : 'none'}}
								>
									<Text>Home</Text>
								</Link>
							</Flex>
							<Flex className="sidebar-items">
								<Link>
									<Icon
										as={FiHome}
										fontSize="2xl"
									/>
								</Link>
								<Link
									_hover={{textDecor : 'none'}}
								>
									<Text>Home</Text>
								</Link>
							</Flex>
						</Flex>
					</Flex>
					<Flex flexDir="column" alignItems="center" mb={10} mt={5}>
						<Avatar my={2} src="./photo.jpg"/>
						<Text textAlign="center">OH DAHYE</Text>
					</Flex>
				</Flex>
			</Flex>

			{/*column 2*/}
			<Flex></Flex>

			{/*column 3*/}
			<Flex></Flex>
		</Flex>
	);
}
