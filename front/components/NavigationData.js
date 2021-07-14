import { FiBarChart, FiHeart, FiHome } from 'react-icons/fi';
import { BiSmile, BiSad, BiChat } from 'react-icons/bi';
import { RiKakaoTalkLine } from 'react-icons/ri';

export const NavigationData = [
    {
        link : '/dashboard/chatReport',
        icon : BiChat,
        title : "우리의 채팅 통계",
    },{
        link : '/dashboard/commonWords',
        icon: RiKakaoTalkLine,
        title : "우리가 주로 사용하는 말"
    },{
        link : '/dashboard/loveCalc',
        icon: FiHeart,
        title : "우리의 애정 척도",
    },
    {
        link : '/dashboard/sentiment1',
        icon : BiSmile,
        title : "기분 좋을 때 사용하는 단어"
    },{
        link: '/dashboard/sentiment2',
        icon: BiSad,
        title : "기분 나쁠 때 사용하는 단어"
    }
]