import lodash from 'lodash';
import $ from 'jquery';
import events from 'event-emitter';

import React from 'react';
import { StaticAssetsStore, StaticAssetsStoreEvents } from './emitters/staticAssets';
import { Main } from './main.jsx!';
import { PreloadComponent } from './views/preload.jsx!';
import { IntroComponent, IntroEvents } from './views/intro.jsx!';
import { Data, DataEvents } from './data/data';

window._ = lodash; // TODO: What to do with this nasty girl

export class Application {
	constructor(){

		React.initializeTouchEvents(true);

		Application.history = [];
		window.addEventListener("hashchange", _.bind(this.handleHashChange, this))

		this.appdata = new Data();

		this.showIntro = true;

		Application.pipe.on(DataEvents.CONFIG, ()=> {
			this.staticAssetsStore = new StaticAssetsStore();
		});

		// Preload default assets
		Application.pipe.on(StaticAssetsStoreEvents.COMPLETE, (progress)=>{
			this.assetsLoaded = true;
			document.body.setAttribute("class", "assets-loaded");
			console.log('assets');
			if ( this.introComplete ){
				this.showIntro = false;
				this.main = new Main();
			}
		});

		// Listen for the intro Skip event
		Application.pipe.on(IntroEvents.SKIP, (skip)=>{
			if ( skip && this.showIntro ){
				this.introComplete = true;
				if ( this.assetsLoaded ){
					this.showIntro = false;
					React.unmountComponentAtNode(document.getElementById('intro'));
					this.main = new Main();
				}
			}
		});

		// Listen for the intro Complete event
		Application.pipe.on(IntroEvents.COMPLETE, (complete)=>{
			if ( complete && this.showIntro ){
				this.introComplete = true;
				if ( this.assetsLoaded ){
					this.showIntro = false;
					React.unmountComponentAtNode(document.getElementById('intro'));
					this.main = new Main();
				}
			}
		});

		if ( !window.location.hash || window.location.hash == "#/" && this.showIntro ){
			React.render(React.createElement(IntroComponent), document.getElementById('intro'));			
		} else {
			this.introComplete = true;
		}

		React.render(React.createElement(PreloadComponent), document.getElementById('preloader'));
	}

	handleHashChange(event){
		event.fromTop = window.pageYOffset;
		Application.history.push(event);
	}
}
Application.pipe = events(this);

$(()=>{
	new Application();
});