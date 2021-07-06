import '../styles/global.css';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
	const [chatData, setChatData] = useState(null);
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
