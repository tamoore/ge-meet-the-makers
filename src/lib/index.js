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

window._ = lodash; // TODO: What to do with this nasty girl

export class Application {
	constructor(){

		Application.history = [];
		window.addEventListener("hashchange", _.bind(this.handleHashChange, this))

		this.appdata = new Data();

		Application.pipe.on(DataEvents.CONFIG, ()=> {
			this.staticAssetsStore = new StaticAssetsStore();
			this.ambientVideoEmitter = new AmbientVideoEmitter();
		});



		Application.pipe.on(IntroVideoEvents.COMPLETE, ()=>{
			this.introVideoComplete = true;
			React.unmountComponentAtNode(document.getElementById('introVideo'));
			if(this.staticAssetsStoreComplete){
				this.unmountCom();
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
Application.pipe = events(this);
Application.maker = Math.ceil(Math.random() * (6 - 1) + 1);

$(()=>{
	new Application();
});



