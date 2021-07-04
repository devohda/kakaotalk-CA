import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
	<div>
		<h1>안녕, Next.js</h1>
		<div>{props.shows}</div>
	</div>
);

Index.getInitialProps = async () => {
	const res = await fetch('http://localhost:5000/total-text');
	const data = await res.json();
	console.log(data);

	return {
		shows: 'hello'
	};
};

export default Index;
