import { useContext } from 'react';
import { Flex, Text, Image, Button, Icon } from '@chakra-ui/react';
import { FiBarChart, FiBarChart2, FiHome, FiPieChart } from 'react-icons/fi';
import SidebarItems from './SidebarItems';
import UserContext from './UserContext';

const Navigation = () => {
	const { resetData } = useContext(UserContext);
	return (
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
						<SidebarItems
							link="/dashboard/chatReport"
							icon={FiHome}
							title="우리의 채팅 통계"
							active={true}
						/>
						<SidebarItems
							link="/dashboard/commonWords"
							icon={FiBarChart}
							title="우리가 주로 사용하는 말"
							active={false}
						/>
						<SidebarItems
							link="/dashboard/loveCalc"
							icon={FiBarChart2}
							title="우리의 애정 척도"
							active={false}
						/>
						<SidebarItems
							link="/dashboard/emotion"
							icon={FiPieChart}
							title="기분에 따라 사용하는 단어"
							active={false}
						/>
					</Flex>
				</Flex>
				<Flex flexDir="column" alignItems="center" mb={10} mt={5}>
					<Button
						className="backToHomeButton"
						onClick={resetData}
						color="#777"
					>
						<Icon as={FiHome} color="#777" />
						<Text ml="10px">다른 대화 분석하기</Text>
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Navigation;
