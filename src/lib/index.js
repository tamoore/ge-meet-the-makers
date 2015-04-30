import $ from 'jquery';
import Hammer from 'hammerjs';
import _ from 'lodash';

class Application {
	constructor(){
		this.now = new Date();
		this.clock = document.getElementById('localTime');
		this.currentOffset = 0;

		// Basic timeline attachment
		this.timeline = document.getElementById('timelineWrapper');
		this.timelineList = document.getElementById('timelineList');


		this.timelineMC = new Hammer(this.timeline);
		this.timelineMC.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
		this.timelineMC.on('panleft panright', _.bind(this.handlePanOfTimeline, this));
		this.timelineMC.on('panend', _.bind(this.handlePanEnd, this));

		this.createLocalTimeCounter();

	}

	handlePanEnd(event){
		console.log("end");
	}

	handlePanOfTimeline(event){
		let offset = event.deltaX;
		this.currentOffset = this.currentOffset + (offset/5);
		this.timelineList.style.transform = "translateX("+this.currentOffset+"px)";

	}

	createLocalTimeCounter(){

		var hours = this.now.getHours();
		var	minutes = this.now.getMinutes();
		var clock = this.clock;

		// Create offset measurement for scroller
		// Entire scroller = 96 blocks of 15 minutes (add another two units for spacer between 00 and 24)

		var offsetHours = parseInt(hours) * 4;
		var offsetMinutes = Math.round( minutes / 15 );

		clock.setAttribute('data-start', offsetHours + offsetMinutes);

		// Set clock hands
		var handHour = document.getElementById('handHour');
		var handMinute = document.getElementById('handMinute');

		// Subtract 90 degrees to account for the start position
		var rotateMinute = ( parseInt(minutes) * 6 ) - 90;
		var rotateHour = ( parseInt(hours) * 30 ) + ( parseInt(minutes) / 2 ) - 90;

		handHour.style.webkitTransform = 'rotate('+rotateHour+'deg)';
		handHour.style.mozTransform    = 'rotate('+rotateHour+'deg)';
		handHour.style.msTransform     = 'rotate('+rotateHour+'deg)';
		handHour.style.oTransform      = 'rotate('+rotateHour+'deg)';
		handHour.style.transform       = 'rotate('+rotateHour+'deg)';

		handMinute.style.webkitTransform = 'rotate('+rotateMinute+'deg)';
		handMinute.style.mozTransform    = 'rotate('+rotateMinute+'deg)';
		handMinute.style.msTransform     = 'rotate('+rotateMinute+'deg)';
		handMinute.style.oTransform      = 'rotate('+rotateMinute+'deg)';
		handMinute.style.transform       = 'rotate('+rotateMinute+'deg)';

		// Format minutes with leading zero
		var formatHour = ( hours < 10 ) ? "0" + hours : hours;
		var formatMinute = ( minutes < 10 ) ? "0" + minutes : minutes;

		// Set clock local time
		var time = formatHour + ":" + formatMinute;
		clock.innerHTML = time;
	}

}


$(function(){
	new Application();

	window.addEventListener("keyup", function(e){
		if( e.keyCode === 37 ) {
			e.preventDefault();

			$( "#timelineList" ).animate({
				left: "-=10em"
			}, 250, function() {});
		}

		if( e.keyCode === 39 ) {
			e.preventDefault();

			$( "#timelineList" ).animate({
				left: "+=10em"
			}, 250, function() {});
		}
	
	});
	
	$('#timelineList').on('mousewheel', function(event) {
		var delta,
			deltaX = event.deltaX,
			deltaY = event.deltaY,
			factor = event.deltaFactor;
		console.log(event.deltaX);
	});

	if (document.getElementById('makerPanels')) {
		$('.maker-panel').on('click', function(){
			var $panel = $(this);
			$('.maker-panel').not($('.maker-panel').eq($('.maker-panel').index(this))).removeClass('show-excerpt');
			$(this).toggleClass('show-excerpt');
			
			$('.maker-bio-excerpt a', $panel).on('click', function(e){
				e.preventDefault();
				event.stopPropagation();
				$panel.addClass('show-article').removeClass('show-excerpt');
			});
		});
	}

});