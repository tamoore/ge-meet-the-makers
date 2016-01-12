<<<<<<< HEAD
import { PreloadFactory } from './emitters/preload';
import lodash from 'lodash';
import { ClockView } from './views/clock';
import { TimelineWrapperView } from './views/timeline';
import { TimelineListView } from './views/timeline';
import { TimelineStageView } from './views/timeline';
window._ = lodash;

class Application {
	constructor(){

		this.tempProgress = document.getElementById("tempProgress");

		this.preload = new PreloadFactory();
		this.clock = new ClockView('localTime');
		this.timelineWrapper = new TimelineWrapperView("timelineWrapper");
		this.timelineList = new TimelineListView('timelineList');
		this.timelineStage = new TimelineStageView('ambientvideos');


		// Create the stage
		//this.stage = new createjs.Stage("ambientvideos");




	}




	changeCurrentStatic(index){
		var image = new createjs.Bitmap(this.preload.getResult("maker01_"+index+"_jpg"));
		this.stage.addChild(image);
		this.stage.update();
	}

	handlePanEnd(event){
		console.log("end");
	}

	handlePanOfTimeline(event){

		this.changeCurrentStatic(index < 10 ? '0'+index : index);

	}

}

$(function(){
	new Application();

});
=======
import lodash from 'lodash';
import $ from 'jquery';
import events from 'event-emitter';

import React from 'react';
import { StaticAssetsStore, StaticAssetsStoreEvents } from './emitters/staticAssets';
import { AmbientVideoEmitter, IntroVideoEvents } from './emitters/ambientVideo';
import { Main } from './main.jsx!';
import { PreloadComponent } from './views/preload.jsx!';
import { IntroVideoComponent } from './views/introVideo.jsx!';
import { Data, DataEvents } from './data/data';
import cookie from 'cookie';

window._ = lodash; // TODO: What to do with this nasty girl

(function () {
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
})();

export class Application {
	constructor(){

		Application.history = [];
		window.addEventListener("hashchange", _.bind(this.handleHashChange, this))

		this.appdata = new Data();

		Application.pipe.on(DataEvents.CONFIG, ()=> {
			this.staticAssetsStore = new StaticAssetsStore();
			this.ambientVideoEmitter = new AmbientVideoEmitter();
		});

		Application.pipe.on(Application.SKIPVIDEO, ()=>{
			this.unmountCom();
			this.introVideoComplete = true;
			if(this.staticAssetsStoreComplete){
				this.main = new Main();
			}
		});

		Application.pipe.on(IntroVideoEvents.COMPLETE, ()=>{
			this.introVideoComplete = true;
			this.unmountCom();
			if(this.staticAssetsStoreComplete){
				this.main = new Main();
			}
		});

		Application.pipe.on(StaticAssetsStoreEvents.COMPLETE, (progress)=>{
			this.staticAssetsStoreComplete = true;
			document.body.setAttribute("data-loading", "false");
			if(this.introVideoComplete){
				this.main = new Main();
			}
		});

		if(!window.location.hash || window.location.hash == "#/"){
			React.render(React.createElement(IntroVideoComponent), document.getElementById('introVideo'));
		}else{
			this.introVideoComplete = true;
		}

		React.render(React.createElement(PreloadComponent), document.getElementById('preload'));

	}

	handleHashChange(event){
		Application.history.push(event);
	}

	unmountCom(){
		React.unmountComponentAtNode(document.getElementById('introVideo'));

	}
}
Application.setSplashSeen = function(){
	localStorage.setItem("seenSplash", "true");
	Application.shownSplash = true;
}
Application.pipe = events(this);
Application.maker = Math.ceil(Math.random() * (5 - 1) + 1);
Application.assetLocation  = "http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/";
Application.SKIPVIDEO = "skipvideo";
Application.makers = ['dr-jason-held','andrew-lillyman','dr-tara-martin','dr-geoff-symonds','bruce-brymer'];
Application.shownSplash = localStorage.getItem("seenSplash") == "true" ? true : false;




>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
