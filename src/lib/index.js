import { Preload, PreloadFactory } from './emitters/preload';
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

		if(this.tempProgress){
			this.preload.on(Preload.PROGRESS, (progress)=>{
				this.tempProgress.textContent = progress + "%";
			});
		}

		this.clock = new ClockView('localTime');
		this.timelineWrapper = new TimelineWrapperView("timelineWrapper");
		this.timelineList = new TimelineListView('timelineList');
		this.timelineStage = new TimelineStageView('ambientvideos');



	}


}

$(function(){
	new Application();

});