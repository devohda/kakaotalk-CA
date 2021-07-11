module.exports = {
	async rewrites() {
		return [
			{
				source: '/api/chatReport',
				destination: 'http://34.146.140.41:5000/chatReport'
			},
			{
				source: '/api/commonWords',
				destination: 'http://34.146.140.41:5000/commonWords'
			},
			{
				source: '/api/emotion',
				destination: 'http://34.146.140.41:5000/emotion'
			},
			{
				source: '/api/loveCalc',
				destination: 'http://34.146.140.41:5000/loveCalc'
			},
			{
				source: '/',
				destination: '/home'
			}
		];
	}
};
