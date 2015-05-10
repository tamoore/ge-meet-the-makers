import lodash from 'lodash';
import $ from 'jquery';
import events from 'event-emitter';

import React from 'react';
import { StaticAssetsStore, StaticInstanceStoreInstance } from './emitters/staticAssets';
import { AmbientVideoEmitter } from './emitters/ambientVideo';

// Views
import { ClockView } from './views/clock.jsx!';
import { TimelineWrapperViewComponent } from './views/timeline.jsx!';


window._ = lodash;
export class Application {
	constructor(){

		Application.pipe = events(this);

		this.staticAssetsStore = new StaticAssetsStore();
		this.ambientVideoEmitter = new AmbientVideoEmitter();

		if(this.tempProgress){
			this.preload.on(StaticAssetsStore.PROGRESS, (progress)=>{
				this.tempProgress.textContent = progress + "%";
			});
		}

		React.render(React.createElement(TimelineWrapperViewComponent, {}), document.getElementById("TimelineWrapperViewComponent"));
		React.render(React.createElement(ClockView, {}), document.getElementById("ClockView"));

	}
}
$(()=>{
	new Application();
})



