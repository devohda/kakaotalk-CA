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
				source: '/api/loveCalc',
				destination: 'http://34.146.140.41:5000/loveCalc'
			},
			{
				source: '/api/sentiment',
				destination: 'http://34.146.140.41:5000/sentiment'
			},
			{
				source: '/',
				destination: '/home'
			}
		];
	}
};
