import { BaseView } from './base';
import { TimelineEmitter, TimelineFactory } from '../emitters/timeline';
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

        this.timeline.on(TimelineEmitter.PAN, _.bind(this.handleTimeLinePan, this));
        this.timeline.on(TimelineEmitter.PANEND, _.bind(this.handleTimeLinePanEnd, this));

        //TODO: Adding the overall structure for it.
        this.handleTimeLinePanEnd(1);

    }
    stageUpdate(image){
        this.stage.addChild(image);
        this.stage.update();
    }

    handleFileLoaded(event){
        console.log("File Loaded:", event);
    }

    handleTimeLinePanEnd(imageid){
        console.log(imageid);
        if(_.inRange(imageid, 0, config.preload.MAKER_AMBIENT_COUNT+1)){
            var videourl = this.preload.getAmbientVideoSrc("01", this.getformattedId(imageid));
            this.stageUpdate( this.ambientVideoEmitter.returnStageVideo(videourl) );
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

    handleTimeLinePan(offset, imageid){
        if(_.inRange(imageid, 0, config.preload.MAKER_AMBIENT_COUNT+1)){
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
        this.timeline.on(TimelineEmitter.PAN, _.bind(this.handleTimeLinePan, this));
        this.width = this.el.clientWidth;

    }
    handleTimeLinePan(offset, imageid){
        if(Math.abs(offset) < this.width && Math.abs(offset) > 0){
            this.el.style.webkitTransform = "translateX("+offset+"px)";
            this.el.style.MozTransform = "translateX("+offset+"px)";
            this.el.style.msTransform = "translateX("+offset+"px)";
            this.el.style.OTransform = "translateX("+offset+"px)";
            this.el.style.transform = "translateX("+offset+"px)";
        }

    }
}

export class TimelineWrapperView extends BaseView {
    constructor(id){
        super(id);
        this.timeline = new TimelineFactory(this.el);


    }

}