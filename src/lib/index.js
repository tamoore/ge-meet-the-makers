import lodash from 'lodash';
import events from 'event-emitter';

import React from 'react';
import { StaticAssetsStore, StaticInstanceStoreInstance } from './emitters/staticAssets';
import { AmbientVideoEmitter } from './emitters/ambientVideo';



// Views
import { ClockView } from './views/clock.jsx!';
import { TimelineWrapperViewComponent } from './views/timeline.jsx!';

//import { TimelineListView } from './views/timeline';
//import { TimelineStageView } from './views/timeline';

window._ = lodash;

export class Application {
	constructor(){

		Application.pipe = events(this);

		//this.tempProgress = document.getElementById("tempProgress");

		this.staticAssetsStore = new StaticAssetsStore();
		this.ambientVideoEmitter = new AmbientVideoEmitter();

		if(this.tempProgress){
			this.preload.on(StaticAssetsStore.PROGRESS, (progress)=>{
				this.tempProgress.textContent = progress + "%";
			});
		}


		//this.timelineWrapper = new TimelineWrapperView("timelineWrapper");
		//this.timelineStage = new TimelineStageView('ambientvideos');
		//this.timelineList = new TimelineListView('timelineList');

		React.render(React.createElement(TimelineWrapperViewComponent, {}), document.getElementById("TimelineWrapperViewComponent"));
		React.render(React.createElement(ClockView, {}), document.getElementById("ClockView"));




		//this.clock = new ClockView('localTime');
	}

	//registerObservers(){
	//	//Object.observe(this.clock, (changes)=>{
	//	//	console.log(cahnges);
	//	//});
	//}

}


$(function(){
	new Application();

});