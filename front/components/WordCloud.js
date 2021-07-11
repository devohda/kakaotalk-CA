import React, { Component, useEffect } from 'react';
import { Chart } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

export default class WordCloud extends Component {
	chartRef = React.createRef();

	componentDidMount() {
		const myChartRef = this.chartRef.current.getContext('2d');

		Chart.register(WordCloudController, WordElement);
		new Chart(myChartRef, {
			type: WordCloudController.id,
			data: {
				labels: this.props.words.map(d => d.key),
				datasets: [
					{
						label: '',
						data: this.props.words.map(d => {
							if (d.value > 10) {
								return 15 + parseInt(d.value % 100);
							} else {
								return 10 + d.value * 10;
							}
						})
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
	}
	render() {
		return (
			<div fontSize={30}>
				<canvas id="myChart" ref={this.chartRef} height="300vh" />
			</div>
		);
	}
}
