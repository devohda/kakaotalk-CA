import React, { Component, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

export default WordCloud = props => {
	const chartRef = useRef(null);

	useEffect(() => {
		const myChartRef = chartRef.current.getContext('2d');

		Chart.register(WordCloudController, WordElement);
		new Chart(myChartRef, {
			type: WordCloudController.id,
			data: {
				labels: props.words.map(d => d.key),
				datasets: [
					{
						label: '',
						data: props.words.map(d => 10 + d.value * 10)
					}
				]
			},
			options: {
				title: {
					display: false,
					text: 'Chart.js Word Cloud'
				},
				plugins: {
					legend: {
						display: false
					}
				}
			},
			defaults: {
				global: {
					defaultFontFamily: '굴림'
				}
			}
		});
	});

	return (
		<div fontSize={30}>
			<canvas id="myChart" ref={chartRef} height="300vh" />
		</div>
	);
};
