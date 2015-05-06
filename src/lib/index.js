import { PreloadFactory } from './emitters/preload';

import { ClockView } from './views/clock';
import { TimelineWrapperView } from './views/timeline';
import { TimelineListView } from './views/timeline';
import { TimelineStageView } from './views/timeline';

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