/**
 * View for Makers Info
 *
 */
import { Application } from '../index';
import { MainEvents } from '../main.jsx!';
import { IntroVideo, IntroVideoEvents } from '../emitters/ambientVideo';
import { TimelineBackgroundComponent } from './timeline.jsx!';

import React from 'react';
import easeljs from 'easeljs';
import tweenjs from 'tweenjs';

export class IntroVideoComponent extends TimelineBackgroundComponent {
    constructor(){
        super();
        this.introVideo = new IntroVideo();
        this.handleSkipVideo = this.handleSkipVideo.bind(this);
        this.assignEvents();

    }
    assignEvents(){
        Application.pipe.on(IntroVideoEvents.PLAYING, _.bind(this.handleVideoPlaying, this));
    }

    componentWillMount(){
        MainEvents.timeLinetimeout = 3500;
        MainEvents.footerTimeout = 3500;
    }

    handleSkipVideo(){
        Application.pipe.emit(Application.SKIPVIDEO);
    }

    handleVideoPlaying(video /* videoDOM element */){
        if(video){
            var videoContainer = React.findDOMNode(this.refs.videoContainer);
            videoContainer.appendChild(video);

            //var v = video;
            //var video = new createjs.Bitmap(video);
            //this.applyFade(video);
            //video.scaleX = 2;
            //video.scaleY = 2;
            //this.stageUpdate( video );
        }

        return false;
    }

    componentWillUnmount(){
        this.introVideo.kill();
        delete this.introVideo;
    }

    render(){
        var styles = {
          marginTop: (this.state.canvasHeight < window.innerHeight ?  (window.innerHeight - this.state.canvasHeight) / 2 : 0 )+"px"
        };
        return (
            <div className="introVideoContainer" ref="videoContainer" style={styles}>
                <a href="javascript:void(0)" onClick={this.handleSkipVideo} className="skip-video">Skip Video</a>
            </div>
        )
    }
}
//IntroVideoComponent.timeLinetimeout = null;



