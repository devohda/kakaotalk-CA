import '../styles/global.css';
import React, { useState } from 'react';
import App from 'next/app';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import UserContext from '../components/UserContext';

class MyApp extends App {
	state = {
		chatData: null
	};

	componentDidMount = () => {
		const chatData = localStorage.getItem('chatData');
		if (chatData) {
			this.setState({
				chatData
			});
		} else {
			Router.push('/home');
		}
	};

	analyzeData = chatData => {
		localStorage.setItem('chatData', chatData);

		this.setState(
			{
				chatData
			},
			() => {
				Router.push('/analyze');
			}
		);
	};

	resetData = () => {
		localStorage.removeItem('chatData');
		this.setState({
			chatData: null
		});
		Router.push('/home');
	};

	render() {
		const { Component, pageProps } = this.props;

		return (
			<UserContext.Provider
				value={{
					chatData: this.state.chatData,
					analyzeData: this.analyzeData,
					resetData: this.resetData
				}}
			>
				<ChakraProvider>
					<Component {...pageProps} />
				</ChakraProvider>
			</UserContext.Provider>
		);
	}
}

export default MyApp;
