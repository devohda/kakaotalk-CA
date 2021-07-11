import { Flex, Heading, Text } from '@chakra-ui/react';

const Row = ({ title, percent1, percent2 }) => (
	<Flex h="100%" className="row" alignItems="center">
		<Flex flex={1} pl={10} fontSize="1vw">
			{title}
		</Flex>
		<Flex fontSize="2xl" flex={1}>
			{percent1}
		</Flex>
		<Flex fontSize="2xl" flex={1}>
			{percent2}
		</Flex>
	</Flex>
);

const Table = props => {
	const rows = props.data.map(rowData => <Row {...rowData} />);

	return (
		<Flex
			className="table"
			flexDir="column"
			backgroundColor="#f6f6f6"
			boxShadow="0px 0px 9px 1px #ddd"
			w="60%"
			h="50%"
			marginY="10%"
		>
			<Flex
				height="30%"
				className="header"
				width="100%"
				flexDirection="row"
				fontWeight="bold"
				fontSize="2xl"
				borderBottom="solid white 3px"
			>
				<Flex flex={1} pl={10}></Flex>
				<Flex flex={1}>{props.names.name1}</Flex>
				<Flex flex={1}>{props.names.name2}</Flex>
			</Flex>
			<Flex height="67%" className="body" flexDir="column">
				{rows}
			</Flex>
		</Flex>
	);
};

export default Table;
