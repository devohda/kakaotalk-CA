import { Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
const SidebarItems = props => {
	return (
		<Flex className="sidebar-items">
			<Link href={props.link} className="nav-link">
				<Icon
					as={props.icon}
					fontSize="2xl"
					className={props.active ? 'active-icon' : ''}
				/>
			</Link>
			<Link
				href={props.link}
				_hover={{ textDecor: 'none' }}
				className="nav-link"
			>
				<Text className={props.active ? 'active' : ''}>
					{props.title}
				</Text>
			</Link>
		</Flex>
	);
};

export default SidebarItems;
