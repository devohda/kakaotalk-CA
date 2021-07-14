import {useContext, useState} from 'react';
import {Flex, Text, Image, Button, Icon} from '@chakra-ui/react';
import {FiBarChart, FiHeart, FiHome} from 'react-icons/fi';
import {BiSmile, BiSad, BiChat} from 'react-icons/bi';
import {RiKakaoTalkLine} from 'react-icons/ri';
import SidebarItems from './SidebarItems';
import UserContext from './UserContext';
import {NavigationData} from "./NavigationData";

const Navigation = () => {
    const {resetData} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(null)
    return (
        <Flex className="nav-container">
            <Flex flexDir="column" justifyContent="space-between" h="100vh">
                <Flex flexDir="column" as="nav" alignItems="center">
                    <Flex w="50%" mt="4vh" mb="16vh">
                        <Image src="/logo.png"/>
                    </Flex>
                    <Flex
                        flexDir="column"
                        align="flex-start"
                        justifyContent="center"
                    >
                        {NavigationData.map((item, index) => {
                            return (<SidebarItems link={item.link} icon={item.icon} title={item.title}/>)
                        })}
                    </Flex>
                </Flex>
                <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                    <Button
                        className="backToHomeButton"
                        onClick={resetData}
                        color="#777"
                    >
                        <Icon as={FiHome} color="#777"/>
                        <Text ml="10px">다른 대화 분석하기</Text>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Navigation;
