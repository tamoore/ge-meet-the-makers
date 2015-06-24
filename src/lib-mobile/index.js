import lodash from 'lodash';
import $ from 'jquery';
import events from 'event-emitter';

import React from 'react';
import { StaticAssetsStore, StaticAssetsStoreEvents } from './emitters/staticAssets';
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

		Application.pipe.on(DataEvents.CONFIG, ()=> {
			this.staticAssetsStore = new StaticAssetsStore();
		});

		Application.pipe.on(StaticAssetsStoreEvents.COMPLETE, (progress)=>{
				this.main = new Main();
		});
		React.render(React.createElement(PreloadComponent), document.body);

	}

	handleHashChange(event){
		Application.history.push(event);
	}
}
Application.pipe = events(this);

$(()=>{
	new Application();
});