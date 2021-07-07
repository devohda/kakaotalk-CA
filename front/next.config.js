module.exports = {
	async rewrites() {
		return [
			{
				source: '/api/chatReport',
				destination: 'http://localhost:5000/chatReport'
			},
			{
				source: '/api/commonWords',
				destination: 'http://localhost:5000/commonWords'
			},
			{
				source: '/api/emotion',
				destination: 'http://localhost:5000/emotion'
			},
			{
				source: '/api/loveCalc',
				destination: 'http://localhost:5000/loveCalc'
			},
			{
				source: '/',
				destination: '/home'
			}
		];
	}
};
