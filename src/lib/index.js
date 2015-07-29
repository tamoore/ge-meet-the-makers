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
Application.shownSplash = localStorage.getItem("seenSplash") == "true" ? false : false;




