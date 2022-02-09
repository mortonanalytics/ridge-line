import './d3.min.js'
import { addRidgeLines } from './addRidgeLines.js'
import {msg} from './data.js'
console.log(msg);

const this_div = 'main',
  width = document.body.clientWidth,
  height = 400,
  margin = {left:40, right:40, top:25, bottom:25}

const svg = d3.select('#'+ this_div)
  .append('svg')
  .attr('class', 'myIO-svg')
  .attr('id', 'myIO-svg' + this_div)
  .attr('width', width)
  .attr('height', height);

const plot = svg.append('g')
  .attr('transform','translate('+margin.left+','+margin.top+')')
	.style('width', width - margin.right)
	.attr('class', 'myIO-chart-offset');

const chart = plot
			.append('g')
			.attr('class', 'myIO-chart-area');

const tooltip = d3.select('#'+ this_div).append("div").attr("class", "toolTip");
		
const toolTipTitle = tooltip
  .append('div')
  .attr('class', 'toolTipTitle')
  .style('background-color', 'lightgray');

const toolTipBody = tooltip
  .append('div')
  .attr('class', 'toolTipBody');

const overlap = Math.max( Math.round( msg.length * 0.15 ), 1 );

const ridgeScale = d3.scaleBand()
	.range( [height - ( margin.top + margin.bottom ), margin.top ] )
	.domain( msg.map(d => d.label).reverse() );
  
const xScale =  d3.scaleLinear()
  .range( [0, width - (margin.left + margin.right)] )
  .domain( [-3.6, 31] );

const yScale = d3.scaleLinear()
  .range( [0, -overlap * ridgeScale.step()] )
  .domain( [0, 0.5] );

const that = {ridgeScale, xScale, yScale};

addRidgeLines(chart, msg, that);



