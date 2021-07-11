import '../styles/global.css';
import React, { useState } from 'react';
import App from 'next/app';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import UserContext from '../components/UserContext';

export default class MyApp extends App {
	state = {
		chatData: null,
		name1: null,
		name2: null
	};

	componentDidMount = () => {
		const chatData = localStorage.getItem('chat-data');
		if (chatData) {
			this.setState({
				chatData
			});
		} else {
			Router.push('/home');
		}
	};

	loadData = () => {
		console.log('load data');
		const chatData = localStorage.getItem('chat-data');
		if (chatData) {
			console.log(chatData);
			this.setState({
				chatData
			});
		} else {
			console.log("data isn't exist");
			Router.push('/home');
		}
	};

	analyzeData = data => {
		localStorage.setItem('chat-data', data);
		this.setState({ chatData: data });
		Router.push('/dashboard/chatReport');
	};

	resetData = () => {
		localStorage.removeItem('chat-data');
		this.setState({ chatData: null });
		Router.push('/home');
	};

	render() {
		const { Component, pageProps } = this.props;

		return (
			<ChakraProvider>
				<UserContext.Provider
					value={{
						chatData: this.state.chatData,
						name1: this.state.name1,
						name2: this.state.name2,
						analyzeData: this.analyzeData,
						resetData: this.resetData,
						loadData: this.loadData
					}}
				>
					<Component {...pageProps} />
				</UserContext.Provider>
			</ChakraProvider>
		);
	}
}
