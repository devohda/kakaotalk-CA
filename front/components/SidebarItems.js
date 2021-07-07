import { Flex, Icon, Link, Text } from '@chakra-ui/react';

const SidebarItems = props => {
	return (
		<Flex className="sidebar-items">
			<Link href={props.link}>
				<Icon
					as={props.icon}
					fontSize="2xl"
					className={props.active ? 'active-icon' : ''}
				/>
			</Link>
			<Link href={props.link} _hover={{ textDecor: 'none' }}>
				<Text className={props.active ? 'active' : ''}>
					{props.title}
				</Text>
			</Link>
		</Flex>
	);
};

export default SidebarItems;
