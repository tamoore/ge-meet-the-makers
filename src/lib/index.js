import lodash from 'lodash';
import $ from 'jquery';
import events from 'event-emitter';

import React from 'react';
import { StaticAssetsStore, StaticInstanceStoreInstance } from './emitters/staticAssets';
import { AmbientVideoEmitter } from './emitters/ambientVideo';

import { Main } from './main.jsx!';

window._ = lodash; // TODO: What to do with this nasty girl

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

		this.main = new Main();

	}
}


$(()=>{
	new Application();
});



