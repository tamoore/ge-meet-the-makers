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
        	path+"images/space-sabre-reversed.svg",
        	path+"images/space-sabre.svg",
        	path+"images/plane-virgin-reversed.svg",
        	path+"images/plane-virgin.svg",
        	path+"images/microscope-calimmune-reversed.svg",
        	path+"images/microscope-calimmune.svg",
        	path+"images/train-royhill-reversed.svg",
        	path+"images/train-royhill.svg",
        	path+"images/boat-csiro-reversed.svg",
        	path+"images/boat-csiro.svg",
        	path+"images/video-icon-reversed.svg",
        	path+"images/gallery-icon-reversed.svg",
        	path+"images/datavis-icon-reversed.svg",
        	path+"images/post-icon-reversed.svg",
        	path+"images/close-icon-reversed.svg",
        	path+"images/close-icon.svg",
        	path+"images/quote-icon-reversed.svg",
        	path+"images/filter-icon-reversed.svg",
        	path+"images/facebook-for-content-pieces-reversed.svg",
        	path+"images/twitter-for-content-pieces-reversed.svg",
        	path+"images/linkedin-for-content-pieces-reversed.svg",
        	path+"images/arrow.left.svg",
        	path+"images/arrow.right.svg",
        	path+"images/masthead.bg.png",
        	path+"images/logo.ge.svg",
        	path+"images/nav.hamburger.svg",
        	path+"images/logo.guardian.svg",
        	path+"images/bg.blur.jpg",
        	path+"images/arrows.down.svg",
        	path+"images/mobile.tick.svg",
        	path+"images/mobile.div.svg",
        	path+"images/icon.videoplay.svg"
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
