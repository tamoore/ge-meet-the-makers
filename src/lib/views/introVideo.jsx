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
        this.assignEvents();

    }
    assignEvents(){
        Application.pipe.on(IntroVideoEvents.PLAYING, _.bind(this.handleVideoPlaying, this));
    }

    componentWillMount(){
        MainEvents.timeLinetimeout = 3000;
        MainEvents.footerTimeout = 3500;
    }

    componentWillUnmount(){
        this.introVideo.kill();
        delete this.introVideo;
    }

    render(){
        return (
            <div>
                <canvas ref="Stage" id="introVideo" width="1280" height="720" className="bg"></canvas>
            </div>
        )
    }
}
//IntroVideoComponent.timeLinetimeout = null;



