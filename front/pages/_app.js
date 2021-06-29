import {ChakraProvider} from "@chakra-ui/react";
import Fonts from '../public/fonts'
import theme from '../public/theme'

function MyApp({Component, pageProps}){
    return (
        <ChakraProvider >
            <Fonts/>
            <Component {...pageProps}/>
        </ChakraProvider>
    )
}

export default MyApp;