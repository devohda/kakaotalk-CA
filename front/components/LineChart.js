import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const chartData = {
	datasets: [
		{
			label: '# of Votes',
			fill: false,
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgba(255, 99, 132, 0.2)'
		}
	]
};

const options = {
	maintainAspectRatio: true,
	scales: {
		x: {
			grid: {
				display: false
			}
		},
		y: {
			grid: {
				borderDash: [3, 3]
			}
		}
	},
	plugins: {
		legend: {
			display: false
		}
	}
};

const LineChart = props => {
	useEffect(() => {
		chartData.labels = props.labels;
		chartData.datasets[0].data = props.data;
	});
	return <Line data={chartData} options={options} />;
};

export default LineChart;
