import { Avatar, Flex, Text, Image } from '@chakra-ui/react';
import { FiBarChart, FiBarChart2, FiHome, FiPieChart } from 'react-icons/fi';
import Sidebar from './SidebarItems';
const Navigation = () => (
	<Flex className="nav-container">
		<Flex flexDir="column" justifyContent="space-between" h="100vh">
			<Flex flexDir="column" as="nav" alignItems="center">
				<Flex w="50%" mt="4vh" mb="16vh">
					<Image src="/logo.png" />
				</Flex>
				<Flex
					flexDir="column"
					align="flex-start"
					justifyContent="center"
				>
					<Sidebar
						link="/dashboard/chatReport"
						icon={FiHome}
						title="우리의 채팅 통계"
						active={true}
					/>
					<Sidebar
						link="/dashboard/commonWords"
						icon={FiBarChart}
						title="우리가 주로 사용하는 말"
						active={false}
					/>
					<Sidebar
						link="/dashboard/loveCalc"
						icon={FiBarChart2}
						title="우리의 애정 척도"
						active={false}
					/>
					<Sidebar
						link="/dashboard/emotion"
						icon={FiPieChart}
						title="기분에 따라 사용하는 단어"
						active={false}
					/>
				</Flex>
			</Flex>
			<Flex flexDir="column" alignItems="center" mb={10} mt={5}>
				<Avatar my={2} src="../photo.jpg" />
				<Text textAlign="center">OH DAHYE</Text>
			</Flex>
		</Flex>
	</Flex>
);

export default Navigation;
