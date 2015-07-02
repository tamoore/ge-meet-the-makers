/**
 * About View
 */
import { Application } from '../index';

import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { StaticAssetsStoreEvents } from '../emitters/staticAssets';

export const IntroEvents = {
	SKIP: null,
	COMPLETE: null
};

/**
 * Component for About View
 */
export class IntroVideoComponent extends React.Component {
	constructor(){
		super();
		this.playVideo = _.bind(this.playVideo, this);
    }

    componentDidMount(){
    	var el = React.findDOMNode(this.refs.introvideo);
    	el.addEventListener('ended', function(){
    		console.log('ended');
    		Application.pipe.emit(IntroEvents.COMPLETE, "completed");
    	}, false);
    }

    playVideo(event){
    	var el = React.findDOMNode(this.refs.introvideo);
    	el.play();
    	event.target.setAttribute("class", "hide");
    }

    render(){
        var src = "https://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/videos/introvideo.mp4";
        var classes = "introVideo";
        var controls = false;
        var volume = 0.5;
        var loop = false;
        var width = window.innerWidth;

        return (
            <div className="video">
            	<div className="texture-overlay video-overlay" onClick={this.playVideo}>Play</div>
            	<video src={src} className={classes} controls={controls} volume={volume} loop={loop} width={width} ref="introvideo"></video>
            </div>
        )
    }
}

/**
 * Component for About View
 */
export class IntroComponent extends React.Component {
   
    constructor(){
        super();
        this.state = {
        	showSkip: false
        }
        this.introSkip = _.bind(this.introSkip, this);
    }

    componentDidMount() {
		Application.pipe.on(StaticAssetsStoreEvents.COMPLETE, (progress)=>{
			this.setState({
				showSkip: true
			})
		});
	}

	introSkip(){
		if ( !IntroEvents.SKIP ){
			Application.pipe.emit(IntroEvents.SKIP, "skipped");
		}
	}

    render(){
    	var skip = this.state.showSkip ? <button onClick={this.introSkip}>Skip Video</button> : "";

        return (
            <main className="mobile-intro">
            	<TransitionGroup component="div" transitionName="section">
	                <IntroVideoComponent />
	                {skip}
	            </TransitionGroup>
            </main>
        )
    }
}
