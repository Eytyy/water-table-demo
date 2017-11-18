import * as d3 from 'd3';
import PopulationLayer from './PopulationLayer';
import RiversLayer from './RiversLayer';

const DashboardAnimation = (props, DataInfoComponent) => {
	let ID = 'dataviz';
	let state = {
		shouldPlay: false,
	};
	
	const h = document.querySelector('.dashboard__animation').offsetHeight - 40;
	const w = document.querySelector('.dashboard__animation').offsetWidth;
	const margin = { top: 0, right: 20, bottom: 20, left: 0 };
	const width = w - margin.left - margin.right;
	const height = h - margin.top - margin.bottom;
	
	const svg = d3.select('.dashboard__animation')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.call(responsivefy)
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top })`);

	// Render Layers 
	const Population = PopulationLayer({ svg, width, height, margin, ...props }, true);
	const Rivers = RiversLayer({ svg, width, height, margin, ...props }, true);
	
	function render(year) {
    if (state.activeScreen === ID) return;
		Population(year, state.activeIndex);
		Rivers(year, state.activeIndex);
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

export default DashboardAnimation;



