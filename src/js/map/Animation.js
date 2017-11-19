import * as d3 from 'd3';
import PopulationLayer from './PopulationLayer';
import RiversLayer from './RiversLayer';

const AnimationComponent = (props) => {
	let ID = 'dataviz';
	let state = {
		shouldPlay: false,
	};
	
	const margin = { top: 0, right: 0, bottom: 0, left: 0 };
	const width = window.innerWidth - margin.left - margin.right;
	const height = window.innerHeight - 200 - margin.top - margin.bottom;
	
	const svg = d3.select('.data__visualization')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.call(responsivefy)
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top })`);

	// Render Layers 
	const Population = PopulationLayer({ svg, width, height, margin, ...props }, false);
	const Rivers = RiversLayer({ svg, width, height, margin, ...props }, false);
	
	function render(year, visibility = undefined) {
	 if (state.activeScreen !== ID) return;
		Population(year, state.activeIndex);
		Rivers(year, state.activeIndex);
	}
	
	function changeVisibleLayer(position) {
		switch(position) {
			case 'rivers':
				document.querySelector('.data__dashboard__population').style.display = 'none';
				document.querySelector('.data__dashboard__rivers').style.display = 'flex';
				document.querySelector('.data .atom').style.visibility = 'hidden';
				document.querySelector('.data .rivers').style.visibility = 'visible';
				break;
			case 'population':
				document.querySelector('.data__dashboard__population').style.display = 'block';
				document.querySelector('.data__dashboard__rivers').style.display = 'none';
				document.querySelector('.data .atom').style.visibility = 'visible';
				document.querySelector('.data .rivers').style.visibility = 'hidden';
				break;
			default:
				document.querySelector('.data__dashboard__population').style.display = 'block';
				document.querySelector('.data__dashboard__rivers').style.display = 'flex';
				document.querySelector('.data .atom').style.visibility = 'visible';
				document.querySelector('.data .rivers').style.visibility = 'visible';
				break;
		}
	}
	
	// Update function
	function update(action, newState, year = 1950) {
		// update  local state
		state = {
			...state,
			...newState
		};
		switch(action) {
			case 'toggle-screen':
        render(year);
				break;
			case 'seek-video':
				render(year);
				break;
			case 'timer-progress':
				render(year)
				break;
			case 'change-data-layer':
				changeVisibleLayer(year);
				break;
			default:
				return;
		}
	};

	return update;
};

function responsivefy(svg, forceResize) {
	var container = d3.select(svg.node().parentNode);
	var width = parseInt(svg.style('width'));
	var height = parseInt(svg.style('height'));
	var aspect = width / height;

	svg.attr('viewBox', '0 0 ' + width + ' ' + height)
		.attr('preserveAspectRatio', 'xMinYMid')
		.call(resize);

	d3.select(window).on('resize.' + container.attr('id'), resize);

	function resize() {
		var targetWidth = parseInt(container.style('width'));
		svg.attr('width', targetWidth);
		svg.attr('height', Math.round(targetWidth / aspect));
	}
}

export default AnimationComponent;



