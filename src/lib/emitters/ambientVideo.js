import { Application } from '../index';

import easeljs from 'easeljs';
import config from '../config';
import uuid from 'node-uuid';

export const AmbientVideoEmitterEvent = {
    PLAYING: "ambientvideo:playing",
    VIDEO_SRC: "ambientvideo:source"
}

export class AmbientVideoEmitter {
    constructor(){
        this.config = config.preload;

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
        this.el.width = 640;
        this.el.height = 360;
        Application.pipe.on(AmbientVideoEmitterEvent.VIDEO_SRC, _.bind(this.handleVideoSrc, this))
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
        return this.config.CDN_PROTOCOL +
            "://" + this.config.CDN_HOST +
            "/" + this.config.CDN_BUCKET +
            this.config.VIDEOS_PREFIX +
            this.config.MAKER_AMBIENT_PREFIX
            + makerid + '_' + ( videoid < 10 ? '0'+videoid : videoid ) + '.mp4?uuid='+uuid.v1();
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


