import lodash from 'lodash';
import $ from 'jquery';
import events from 'event-emitter';

import React from 'react';
import { Main } from './main.jsx!';
import { PreloadComponent } from './views/preload.jsx!';
import { Data, DataEvents } from './data/data';

window._ = lodash; // TODO: What to do with this nasty girl

export class Application {
	constructor(){

		React.initializeTouchEvents(true);

		Application.history = [];
		window.addEventListener("hashchange", _.bind(this.handleHashChange, this))

		this.appdata = new Data();

		Application.pipe.on(DataEvents.COMPLETE, ()=> {
			this.main = new Main();
		});

	}

	handleHashChange(event){
		Application.history.push(event);
	}
}
Application.pipe = events(this);

$(()=>{
	new Application();
});