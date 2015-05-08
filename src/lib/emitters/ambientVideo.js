import easeljs from 'easeljs';
import { Base } from './base';
import config from '../config';

export class AmbientVideoEmitter extends Base {
    constructor(){
        super();
        this.config = config.ambientVideo;

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
    }

    handlePlayingVideo(event){
        this.trigger(AmbientVideoEmitter.PLAYING);
    }


    handleVideoError(event) {
        console.log(event);
    }

    handleVideoAbort(event) {
        console.log(event);
    }

    handleLoadedData(event) {
        console.log(event);
    }

    play(url){
        this.el.src = url;
        return this.el;
    }

    returnStageVideo(url){
        var video = new createjs.Bitmap(this.play(url));
        video.scaleX = 1.05;
        video.scaleY = 1.05;
        return video;
    }

}
AmbientVideoEmitter.PLAYING = "ambientvideo:playing";

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
}