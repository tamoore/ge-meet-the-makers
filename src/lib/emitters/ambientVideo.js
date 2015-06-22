import { Application } from '../index';

import { Data } from '../data/data';
import easeljs from 'easeljs';
import uuid from 'node-uuid';

export const AmbientVideoEmitterEvent = {
    PLAYING: "ambientvideo:playing",
    VIDEO_SRC: "ambientvideo:source"
}

export const 

export class AmbientVideoEmitter {
    constructor(){
        this.config = Data.config;
        this._createVideoAndEvents();
        Application.pipe.on(AmbientVideoEmitterEvent.VIDEO_SRC, _.bind(this.handleVideoSrc, this))
    }
    _createVideoAndEvents(){
        this.el = document.createElement('video');
        this.el.addEventListener("error", _.bind(this.handleVideoError, this));
        this.el.addEventListener("abort", _.bind(this.handleVideoAbort, this));
        this.el.addEventListener("loadeddata", _.bind(this.handleLoadedData, this));
        this.el.addEventListener("play", _.bind(this.handlePlayingVideo, this));
        this.el.volume = 0;
        this.el.style.visibility = "visible";
        this.el.controls = false;
        this.el.autoplay = true;
        this.el.loop = true;
        this.el.width = 1920;
        this.el.height = 1080;
    }

    handlePlayingVideo(){
        Application.pipe.emit(AmbientVideoEmitterEvent.PLAYING, this.currentVideo);
    }

    handleVideoError(event) {
       // console.log(event);
    }

    handleVideoAbort(event) {
       // console.log(event);
    }

    handleLoadedData(event) {
       // console.log(event);
    }

    getAmbientVideoSrc(makerid, videoid){
        return this.config.cdnProtocol +
            "://" + this.config.cdnHost +
            "/" + this.config.cdnBucket +
            this.config.videosPrefix +
            this.config.makerAmbientPrefix
            + makerid + '_' + videoid + '.mp4?uuid='+uuid.v1();
    }

    play(url){
        this.el.src = url;
        this.el.play();
        return this.el;
    }

    handleVideoSrc(makerid, id){
        this.currentVideo = this.play(this.getAmbientVideoSrc(makerid, id));

    }

}


