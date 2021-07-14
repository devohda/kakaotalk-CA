import '../styles/global.css';
import React, { useState } from 'react';
import App from 'next/app';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import UserContext from '../components/UserContext';
import axios from 'axios'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default class MyApp extends App {
	state = {
		chatData: null,
		name1: null,
		name2: null
	};

	componentDidMount = () => {
		const chatData = localStorage.getItem('chat-data');
		const name1 = localStorage.getItem('name1');
		const name2 = localStorage.getItem('name2');
		if (chatData) {
			this.setState({ chatData });
			this.setState({ name1 });
			this.setState({ name2 });
			console.log(this.state.name1, this.state.name2);
		} else {
			Router.push('/home');
		}
	};

	loadData = () => {
		const chatData = localStorage.getItem('chat-data');
		const name1 = localStorage.getItem('name1');
		const name2 = localStorage.getItem('name2');
		if (chatData) {
			this.setState({ chatData });
			this.setState({ name1 });
			this.setState({ name2 });
		} else {
			Router.push('/home');
		}
	};

	analyzeData = (firstdate, lastdate, df_user, data) => {
		localStorage.setItem('firstdate', firstdate);
		localStorage.setItem('lastdate', lastdate);
		localStorage.setItem('name1', Object.keys(df_user)[0]);
		localStorage.setItem('name2', Object.keys(df_user)[1]);
		localStorage.setItem('chat-data', data);

		this.setState({ chatData: data });
		this.setState({ name1: Object.keys(df_user)[0] });
		this.setState({ name2: Object.keys(df_user)[1] });

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
