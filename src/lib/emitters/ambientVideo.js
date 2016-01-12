<<<<<<< HEAD
import easeljs from 'easeljs';
import { Base } from './base';
import config from '../config';

export class AmbientVideoEmitter extends Base {
    constructor(){
        super();
        this.config = config.ambientVideo;

=======
import { Application } from '../index';

import { Data } from '../data/data';
import easeljs from 'easeljs';
import uuid from 'node-uuid';

export const AmbientVideoEmitterEvent = {
    PLAYING: "ambientvideo:playing",
    VIDEO_SRC: "ambientvideo:source"
}

export const IntroVideoEvents = {
    PLAYING: "introvideo:playing",
    COMPLETE: "introvideo:complete"
}

export class AmbientVideoEmitter {
    constructor(){
        this.config = Data.config;
        this._createVideoAndEvents();

    }
    _createVideoAndEvents(){
        Application.pipe.on(AmbientVideoEmitterEvent.VIDEO_SRC, _.bind(this.handleVideoSrc, this))
>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
        this.el = document.createElement('video');
        this.el.addEventListener("error", _.bind(this.handleVideoError, this));
        this.el.addEventListener("abort", _.bind(this.handleVideoAbort, this));
        this.el.addEventListener("loadeddata", _.bind(this.handleLoadedData, this));
<<<<<<< HEAD
=======
        this.el.addEventListener("play", _.bind(this.handlePlayingVideo, this));
        this.el.addEventListener("ended", _.bind(this.handleVideoEnd, this));
>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
        this.el.volume = 0;
        this.el.style.visibility = "visible";
        this.el.controls = false;
        this.el.autoplay = true;
        this.el.loop = true;
<<<<<<< HEAD
    }


    handleVideoError(event) {
        console.log(event);
    }

    handleVideoAbort(event) {
        console.log(event);
    }

    handleLoadedData(event) {
        console.log(event);
=======
        this.el.width = 1920;
        this.el.height = 1080;
    }

    handlePlayingVideo(){
        Application.pipe.emit(AmbientVideoEmitterEvent.PLAYING, this.currentVideo);
    }

    handleVideoError(event) {
       // console.log(event);
    }

    handleVideoEnd(event){

    }

    handleVideoAbort(event) {
       // console.log(event);
    }

    handleLoadedData(event) {
       // console.log(event);
    }

    getAmbientVideoSrc(makerid, videoid){
        let config = Data.config;
        var type = navigator.userAgent.indexOf("Firefox") > 0 ? "webm":"mp4";
        return config.cdnProtocol +
            "://" + config.cdnHost +
            "/" + config.cdnBucket +
            config.videosPrefix +
            config.makerAmbientPrefix
            + makerid + '_' + videoid + '.'+type+'?uuid='+uuid.v1();
>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
    }

    play(url){
        this.el.src = url;
<<<<<<< HEAD
        return this.el;
    }

    returnStageVideo(url){
        var video = new createjs.Bitmap(this.play(url));
        video.scaleX = 1.05;
        video.scaleY = 1.05;
        return video;
    }

}

let ambidentvideo;
export class AmbientVideoFactory {
    constructor(){
        if(!ambientVideo){
            ambidentvideo = new AmbientVideoEmitter();
            return ambidentvideo;
        }else{
            return ambidentvideo;
        }
    }
=======
        this.el.play();
        return this.el;
    }

    handleVideoSrc(makerid, id){
        this.currentVideo = this.play(this.getAmbientVideoSrc(makerid, id));
    }


}

export class IntroVideo {
    constructor(){
        this.srcURL = navigator.userAgent.indexOf("Firefox") > 0 ?  "https://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/videos/introvideo.webm" : "https://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/videos/introvideo.mp4";
        this._createVideoAndEvents();
        this.el.loop = false;
        this.currentVideo = this.play(this.srcURL);
    }

    _createVideoAndEvents(){
        this.el = document.createElement('video');
        this.el.style.visibility = "visible";
        this.el.controls = false;
        this.el.width = "100vw";
        this.el.volume = 1;;
        this.el.autoplay = true;
        this.el.loop = false;
        this.el.className = "introVideo";
        this.el.addEventListener("loadstart", _.bind(this.handlePlayingVideo, this));
        this.el.addEventListener("ended", _.bind(this.handleVideoEnd, this));

        //this.el.width = (window.innerHeight)*1.7777778;
        //this.el.height = (window.innerHeight);
    }

    play(url){
        this.el.src = url;
        return this.el;
    }

    handlePlayingVideo(){
        setTimeout(()=>{this.el.volume = 1; this.el.play();},3000);
        Application.pipe.emit(IntroVideoEvents.PLAYING, this.currentVideo);
    }

    handleVideoEnd(event){
        Application.pipe.emit(IntroVideoEvents.COMPLETE);
    }

    kill(){
        //this.el.remove();
        this.currentVideo = undefined;
        this.handlePlayingVideo = function(){ return false; }
    }



>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
}