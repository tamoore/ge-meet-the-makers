import { BaseView } from './base';
import { TimelineScrollEmitter, TimelineFactory } from '../emitters/timelineScroll';
import { Preload, PreloadFactory } from '../emitters/preload';
import { AmbientVideoEmitter } from '../emitters/ambientVideo';


import config from '../config';
import easeljs from 'easeljs';

export class TimelineStageView extends BaseView {
    constructor(id){
        super(id);

        this.timeline = new TimelineFactory();
        this.preload = new PreloadFactory();
        this.ambientVideoEmitter = new AmbientVideoEmitter();

        this.stage = new createjs.Stage(this.el);
        createjs.Ticker.setFPS(32);
        createjs.Ticker.addEventListener("tick", this.stage);

        this.preload.on(Preload.COMPLETE, _.bind(this.handlePreloadComplete, this));
        this.preload.on(Preload.FILELOADED, _.bind(this.handleFileLoaded, this));

        this.timeline.on(TimelineScrollEmitter.PAN, _.bind(this.handleTimeLinePan, this));
        this.timeline.on(TimelineScrollEmitter.PANEND, _.bind(this.handleTimeLinePanEnd, this));

        this.ambientVideoEmitter.on(AmbientVideoEmitter.PLAYING, _.bind(this.handleVideoPlaying, this));

        //TODO: Adding the overall structure for it.
        this.handleTimeLinePanEnd(1);

    }
    stageUpdate(image){
        this.stage.removeAllChildren();
        this.stage.addChild(image);
        this.stage.update();
    }

    handleFileLoaded(event){
        //console.log("File Loaded:", event);
    }

    handleTimeLinePanEnd(imageid){
        if(_.inRange(imageid, 0, config.preload.MAKER_AMBIENT_COUNT+1) && imageid != this.currentImageId){
            var videourl = this.preload.getAmbientVideoSrc("01", this.getformattedId(imageid));
            this.currentVideo = this.ambientVideoEmitter.returnStageVideo(videourl)
            this.currentImageId = imageid;

        }
    }

    handleVideoPlaying(event){
        //console.log("playing")
        if(this.currentVideo){
            this.stageUpdate(this.currentVideo);
        }

    }

    handlePreloadComplete(event){
        // TODO: Porbably don't actually need this.
        //this.stageUpdate( new createjs.Bitmap(this.preload.getResult("maker01_01_jpg")) );
    }

    getformattedId(imageid){
        return (imageid < 10 ? '0'+imageid : imageid)
    }

    generateImageLink(imageid){
        return "maker01_"+ this.getformattedId(imageid) +"_jpg";
    }

    handleTimeLinePan(imageid){
        if(_.inRange(imageid, 0, config.preload.MAKER_AMBIENT_COUNT+1) && imageid != this.currentImageId){

            var image = new createjs.Bitmap(this.preload.getResult(this.generateImageLink(imageid)))
            //image.scaleX = 0.95;
            //image.scaleY = 0.95;
            

            this.stageUpdate( image );
        }

    }



}

export class TimelineListView extends BaseView {
    constructor(id){
        super(id);
        this.timeline = new TimelineFactory();
        this.width = this.el.clientWidth;

    }
}

export class TimelineWrapperView extends BaseView {
    constructor(id){
        super(id);
        this.timeline = new TimelineFactory(this.el, 'timelineList');


    }

}