import React, { Component, useEffect } from 'react';
import { Chart } from 'chart.js';
import { WordCloudChart } from 'chartjs-chart-wordcloud';

const words = [
	{ key: 'simple', value: 2 },
	{ key: 'starting', value: 2 },
	{ key: 'previously', value: 2 },
	{ key: 'move', value: 2 },
	{ key: 'perform', value: 2 },
	{ key: 'hierarchical', value: 2 },
	{ key: 'draw', value: 2 },
	{ key: 'pixel', value: 2 },
	{ key: 'data', value: 2 },
	{ key: 'separately', value: 2 },
	{ key: 'expensive', value: 2 },
	{ key: 'pixels', value: 2 },
	{ key: 'masks', value: 2 },
	{ key: 'implementation', value: 2 },
	{ key: 'detection', value: 2 },
	{ key: 'larger', value: 2 },
	{ key: 'whole', value: 2 },
	{ key: 'comparing', value: 2 },
	{ key: 'box', value: 2 },
	{ key: 'large', value: 2 },
	{ key: 'think', value: 2 },
	{ key: 'version', value: 2 },
	{ key: 'single', value: 2 },
	{ key: 'tree', value: 2 },
	{ key: 'Cloud', value: 1 },
	{ key: 'Generator', value: 1 },
	{ key: 'Works', value: 1 },
	{ key: 'positioning', value: 1 },
	{ key: 'overlap', value: 1 },
	{ key: 'available', value: 1 },
	{ key: 'GitHub', value: 1 },
	{ key: 'open', value: 1 },
	{ key: 'source', value: 1 },
	{ key: 'license', value: 1 },
	{ key: 'd3cloud', value: 1 },
	{ key: 'Note', value: 1 },
	{ key: 'code', value: 1 },
	{ key: 'converting', value: 1 },
	{ key: 'text', value: 1 },
	{ key: 'rendering', value: 1 },
	{ key: 'final', value: 1 },
	{ key: 'output', value: 1 },
	{ key: 'requires', value: 1 },
	{ key: 'additional', value: 1 },
	{ key: 'development', value: 1 },
	{ key: 'quite', value: 1 },
	{ key: 'slow', value: 1 },
	{ key: 'hundred', value: 1 },
	{ key: 'run', value: 1 },
	{ key: 'asynchronously', value: 1 },
	{ key: 'configurable', value: 1 },
	{ key: 'size', value: 1 },
	{ key: 'makes', value: 1 },
	{ key: 'animate', value: 1 },
	{ key: 'stuttering', value: 1 },
	{ key: 'recommended', value: 1 },
	{ key: 'always', value: 1 },
	{ key: 'use', value: 1 },
	{ key: 'animations', value: 1 },
	{ key: 'prevents', value: 1 },
	{ key: 'browsers', value: 1 },
	{ key: 'event', value: 1 },
	{ key: 'loop', value: 1 },
	{ key: 'blocking', value: 1 },
	{ key: 'placing', value: 1 },
	{ key: 'incredibly', value: 1 },
	{ key: 'important', value: 1 },
	{ key: 'Attempt', value: 1 },
	{ key: 'place', value: 1 },
	{ key: 'point', value: 1 },
	{ key: 'usually', value: 1 },
	{ key: 'near', value: 1 },
	{ key: 'middle', value: 1 },
	{ key: 'somewhere', value: 1 },
	{ key: 'central', value: 1 },
	{ key: 'horizontal', value: 1 },
	{ key: 'line', value: 1 },
	{ key: 'intersects', value: 1 },
	{ key: 'one', value: 1 },
	{ key: 'along', value: 1 },
	{ key: 'increasing', value: 1 },
	{ key: 'spiral', value: 1 },
	{ key: 'Repeat', value: 1 },
	{ key: 'intersections', value: 1 },
	{ key: 'found', value: 1 },
	{ key: 'hard', value: 1 },
	{ key: 'part', value: 1 },
	{ key: 'making', value: 1 },
	{ key: 'efficiently', value: 1 },
	{ key: 'According', value: 1 },
	{ key: 'Jonathan', value: 1 },
	{ key: 'Feinberg', value: 1 },
	{ key: 'Wordle', value: 1 },
	{ key: 'uses', value: 1 },
	{ key: 'combination', value: 1 },
	{ key: 'boxes', value: 1 },
	{ key: 'quadtrees', value: 1 },
	{ key: 'achieve', value: 1 },
	{ key: 'reasonable', value: 1 },
	{ key: 'speeds', value: 1 },
	{ key: 'Glyphs', value: 1 },
	{ key: 'JavaScript', value: 1 },
	{ key: 'isnt', value: 1 },
	{ key: 'way', value: 1 },
	{ key: 'precise', value: 1 },
	{ key: 'glyph', value: 1 },
	{ key: 'shapes', value: 1 },
	{ key: 'via', value: 1 },
	{ key: 'DOM', value: 1 },
	{ key: 'except', value: 1 },
	{ key: 'perhaps', value: 1 },
	{ key: 'SVG', value: 1 },
	{ key: 'fonts', value: 1 },
	{ key: 'Instead', value: 1 },
	{ key: 'hidden', value: 1 },
	{ key: 'canvas', value: 1 },
	{ key: 'element', value: 1 },
	{ key: 'Retrieving', value: 1 },
	{ key: 'many', value: 1 },
	{ key: 'batch', value: 1 },
	{ key: 'Sprites', value: 1 },
	{ key: 'initial', value: 1 },
	{ key: 'performed', value: 1 },
	{ key: 'using', value: 1 },
	{ key: 'doesnt', value: 1 },
	{ key: 'copy', value: 1 },
	{ key: 'appropriate', value: 1 },
	{ key: 'position', value: 1 },
	{ key: 'representing', value: 1 },
	{ key: 'advantage', value: 1 },
	{ key: 'involves', value: 1 },
	{ key: 'relevant', value: 1 },
	{ key: 'rather', value: 1 },
	{ key: 'previous', value: 1 },
	{ key: 'Somewhat', value: 1 },
	{ key: 'surprisingly', value: 1 },
	{ key: 'lowlevel', value: 1 },
	{ key: 'hack', value: 1 },
	{ key: 'made', value: 1 },
	{ key: 'tremendous', value: 1 },
	{ key: 'difference', value: 1 },
	{ key: 'constructing', value: 1 },
	{ key: 'compressed', value: 1 },
	{ key: 'blocks', value: 1 },
	{ key: '1bit', value: 1 },
	{ key: '32bit', value: 1 },
	{ key: 'integers', value: 1 },
	{ key: 'thus', value: 1 },
	{ key: 'reducing', value: 1 },
	{ key: 'number', value: 1 },
	{ key: 'checks', value: 1 },
	{ key: 'memory', value: 1 },
	{ key: 'times', value: 1 }
];

export default class WordCloud extends Component {
	chartRef = React.createRef();

	componentDidMount() {
		const myChartRef = this.chartRef.current.getContext('2d');

		new WordCloudChart(myChartRef, {
			type: 'wordCloud',
			data: {
				labels: words.map(d => d.key),
				datasets: [
					{
						label: '',
						data: words.map(d => 10 + d.value * 10)
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
			}
		});
	}
	render() {
		return (
			<div>
				<canvas id="myChart" ref={this.chartRef} height="300vh" />
			</div>
		);
	}
}
