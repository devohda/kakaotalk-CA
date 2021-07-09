import React, { Component, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

Chart.register(WordCloudController, WordElement);

const WordCloud = props => {
	const chartRef = useRef(null);
	const myChartRef = chartRef.current.getContext(props.name);
	useEffect(() => {
		new Chart(myChartRef, {
			id: props.name,
			type: 'wordCloud',
			data: {
				labels: props.words.map(d => d.key),
				datasets: [
					{
						label: '',
						data: props.words.map(d => d.value)
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
			<canvas id={props.name} ref={chartRef} height="300vh" />
		</div>
	);
};

export default WordCloud;
