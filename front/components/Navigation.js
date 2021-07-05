import { Avatar, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react';
import { FiBarChart, FiBarChart2, FiHome, FiPieChart } from 'react-icons/fi';

const Navigation = () => {
	return (
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
								<Text className="active">Home</Text>
							</Link>
						</Flex>
						<Flex className="sidebar-items">
							<Link href="/dashboard/analyze">
								<Icon as={FiBarChart} fontSize="2xl" />
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
								<Icon as={FiBarChart2} fontSize="2xl" />
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
								<Icon as={FiPieChart} fontSize="2xl" />
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
				<Flex flexDir="column" alignItems="center" mb={10} mt={5}>
					<Avatar my={2} src="../photo.jpg" />
					<Text textAlign="center">OH DAHYE</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Navigation;
