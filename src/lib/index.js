import { Preload, PreloadFactory } from './emitters/preload';
import lodash from 'lodash';

//Emitter
import { Base } from './emitters/base';

// Views
import { ClockView } from './views/clock';
import { TimelineWrapperView } from './views/timeline';
import { TimelineListView } from './views/timeline';
import { TimelineStageView } from './views/timeline';

window._ = lodash;

export class Application extends Base {
	constructor(){
		super();

		Application.pipe = this;

		this.tempProgress = document.getElementById("tempProgress");
		this.preload = new PreloadFactory();

		if(this.tempProgress){
			this.preload.on(Preload.PROGRESS, (progress)=>{
				this.tempProgress.textContent = progress + "%";
			});
		}


		this.timelineWrapper = new TimelineWrapperView("timelineWrapper");
		this.timelineStage = new TimelineStageView('ambientvideos');
		this.timelineList = new TimelineListView('timelineList');



		this.clock = new ClockView('localTime');
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