/**
 * Application Routing
 */
import { MobileApplication } from '../index';

/**
 * Vendor Dependencies
 */
import { Data } from '../data/data';
import preloadjs from 'preload';

export const StaticAssetsStoreEvents = {
    PROGRESS: "staticassets:progress",
    COMPLETE: "staticassets:complete",
    FILELOADED: "staticassets:fileloaded",
    GET_RESULT: "staticassets:getresult",
    SEND_RESULT: "staticassets:sendresult"
}

export class StaticAssetsStore  {
    constructor(){
        this.config = Data.config;

		var path = "http://labs.theguardian.com/meet-the-makers/development/mobile/build/";

        this.assets = [
        	path+"images/icon.healthcare.svg",
        	path+"images/icon.space.svg",
        	path+"images/icon.train.svg",
        	path+"images/icon.factory.svg",
        	path+"images/icon.petrol.svg",
        	path+"images/icon.healthcare.svg",
        	path+"images/icon.solar.svg",
        	path+"images/icon.video.svg",
        	path+"images/icon.infographic.svg",
        	path+"images/icon.map.svg",
        	path+"images/icon.longform.svg",
        	path+"images/bg.blur.jpg",
        	path+"images/logo.ge.svg",
        	path+"images/logo.guardian.svg",
        	path+"images/nav.hamburger.svg",
        	path+"images/arrows.down.svg",
        	path+"images/arrow.left.svg",
        	path+"images/arrow.right.svg"
        ];
        this.progress = 0;

        // Preload the static assets
        this.preload = new createjs.LoadQueue();
        this.preload.setMaxConnections(10);
        this.preload.on("progress", this.handleProgress, this);
        this.preload.on("fileload", this.handleFileLoad, this);
        this.preload.on("complete", this.handleCompleteProgress, this);

        MobileApplication.pipe.on(StaticAssetsStoreEvents.GET_RESULT, _.bind(this.getResult, this))

        this.fetchAssets();
    }

    handleFileLoad(event){
        MobileApplication.pipe.emit(StaticAssetsStoreEvents.FILELOADED, event);
    }

    handleProgress(event){
        this.progress = Math.ceil(event.progress*100);
        MobileApplication.pipe.emit(StaticAssetsStoreEvents.PROGRESS, this.progress);
    }

    handleCompleteProgress(event){
        MobileApplication.pipe.emit(StaticAssetsStoreEvents.COMPLETE);
    }

    getResult(id){
        MobileApplication.pipe.emit(StaticAssetsStoreEvents.SEND_RESULT, this.preload.getResult(id));
    }

    fetchAssets(){
    	var i = 0;
        this.assets.forEach((item)=>{
            this.preload.loadFile({id: i, src: item, crossOrigin: true });
            i++;
        });
    }
}
