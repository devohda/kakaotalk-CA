import React, { useState } from 'react';
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Image,
	Input
} from '@chakra-ui/react';

const Home = () => {
	const [fileData, setFileData] = useState(null);

	const uploadToClient = event => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];
			setFileData(i);
		}
	};

	const uploadToServer = async event => {
		if (fileData) {
			const body = new FormData();
			body.append('file', fileData);
			const response = await fetch('/api/file', {
				method: 'POST',
				body
			});
		} else {
			alert('파일을 선택하세요.');
		}
	};

	return (
		<div className="screen" position="relative">
			<Flex
				flexDir="column"
				alignItems="center"
				position="absolute"
				left="50%"
				transform="translate(-50%, 0%)"
			>
				<Flex
					h="100vh"
					maxW="2000px"
					flexDir="column"
					alignItems="center"
					w="20vw"
				>
					<Image src="/logo.png" w="13vw" mt="12vh" />
					<Flex
						w="80%"
						h="40vh"
						backgroundColor="#fafafa"
						borderRadius={5}
					>
						<Flex
							w="100%"
							flexDir="column"
							alignItems="center"
							justifyContent="center"
						>
							<FormControl
								w="70%"
								h="5vh"
								mb="1vh"
								alignSelf="center"
							>
								<Flex w="100%" h="100%">
									<FormLabel className="talk-data">
										{fileData != null
											? fileData.name
											: '카카오톡 대화 파일 업로드 (.txt, .csv)'}
									</FormLabel>
									<Input
										type="file"
										onChange={uploadToClient}
										display="none"
									/>
								</Flex>
							</FormControl>
							<Button
								w="70%"
								h="5vh"
								lineHeight="5vh"
								mt="1vh"
								textAlign="center"
								alignSelf="center"
								onClick={uploadToServer}
								fontSize="13px"
							>
								분석하기
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Image
				h="100vh"
				src="/smartphone.png"
				position="absolute"
				left="50.55%"
				top="0%"
				transform="translate(-50%, 0%)"
				zIndex="-10"
			/>
		</div>
	);
};

export default Home;
