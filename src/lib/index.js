import $ from 'jquery';
import Hammer from 'hammerjs';
import _ from 'lodash';
import preloadjs from 'preload';
import easeljs from 'easeljs';

//===============================================
// Constant VARIABLES
//===============================================
const MAKER_AMBIENT_PREFIX = "maker";
const MAKER_AMIENT_COUNT = 12;
const MAKER_COUNT = 1; // placeholder to deal with makers at a later stage
const MAKER_AMBIENT_TYPES = ['jpg', 'mp4'];
const CDN_HOST = "cdn.labs.theguardian.com";
const CDN_BUCKET = "2015/meet-the-makers/images/"
const CDN_PROTOCOL = "http";

class Application {
	constructor(){
		this.now = new Date();
		this.clock = document.getElementById('localTime');
		this.currentOffset = 0;
		this.assets = [];
		this.tempProgress = document.getElementById("tempProgress");

		// Basic timeline attachment
		this.timeline = document.getElementById('timelineWrapper');
		this.timelineList = document.getElementById('timelineList');

		this.timelineMC = new Hammer(this.timeline);
		this.timelineMC.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
		this.timelineMC.on('panleft panright', _.bind(this.handlePanOfTimeline, this));
		this.timelineMC.on('panend', _.bind(this.handlePanEnd, this));

		this.preload = new createjs.LoadQueue();
		this.preload.on("progress", this.preloadProgress, this);
		this.preload.on("complete", this.completedProgress, this);

		// Create the stage
		this.stage = new createjs.Stage("ambientvideos");


		console.log(this.stage.getBounds());

		this._generateLoaderAssets();
		this.fetchAssets();

		this.createLocalTimeCounter();
	}

	_generateLoaderAssets(){
		var makercount = 1;
		var assetcount = 1;

		let progressTypes = (makerprefix, assetprefix, makercount, assetcount)=>{
			MAKER_AMBIENT_TYPES.forEach((type)=>{
				this.assets.push({ "id": "maker"+makerprefix+makercount+"_"+assetprefix+assetcount+"_"+type,  "type": type, "filename" : CDN_PROTOCOL + "://" + CDN_HOST + "/" + CDN_BUCKET + MAKER_AMBIENT_PREFIX+makerprefix+makercount+'_'+assetprefix+assetcount+'.'+type });
			});
		}
		while(makercount <= MAKER_COUNT){
			while(assetcount <= MAKER_AMIENT_COUNT){
				if(assetcount < 10){
					progressTypes('0', '0', makercount, assetcount);

				}else{
					progressTypes('0','', makercount, assetcount);
				}
				assetcount++;
			}
			makercount++;
		}
		console.log(this.assets);
	}

	preloadProgress(event){
		this.tempProgress.textContent = Math.ceil(event.progress*100)+"%";
	}

	completedProgress(event){
		var image = new createjs.Bitmap(this.preload.getResult("maker01_01_jpg"));
		this.stage.addChild(image);
		this.stage.update();
	}

	fetchAssets(){
		return new Promise((resolved, rejected)=>{
			let jpgs = this.assets.filter((item)=>{
				return item.type == "jpg";
			});
			jpgs.forEach((item)=>{
				this.preload.loadFile({id: item.id, src: item.filename, crossOrigin: true });
			});
		});
	}

	handlePanEnd(event){
		console.log("end");
	}

	handlePanOfTimeline(event){
		let offset = event.deltaX;
		var intervalDifference = 274;
		var index;
		this.currentOffset = this.currentOffset + (offset/5);

		if(this.currentOffset > -3280 && this.currentOffset < 1){
			this.timelineList.style.webkitTransform = "translateX("+this.currentOffset+"px)";
			this.timelineList.style.MozTransform = "translateX("+this.currentOffset+"px)";
			this.timelineList.style.msTransform = "translateX("+this.currentOffset+"px)";
			this.timelineList.style.OTransform = "translateX("+this.currentOffset+"px)";
			this.timelineList.style.transform = "translateX("+this.currentOffset+"px)";
		}
		if(this.currentOffset > 1){
			this.currentOffset = 0;
		}
		if(this.currentOffset < -3281){
			this.currentOffset = -3280
		}
		var index = Math.ceil(Math.abs(this.currentOffset)/intervalDifference);
		this.changeCurrentStatic(index < 10 ? '0'+index : index);

	}
	changeCurrentStatic(index){
		var image = new createjs.Bitmap(this.preload.getResult("maker01_"+index+"_jpg"));
		this.stage.addChild(image);
		this.stage.update();
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

});