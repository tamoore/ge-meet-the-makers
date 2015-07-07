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
    	
    	var classes = event.target.parentNode.getAttribute("class");
    	event.target.parentNode.setAttribute("class", classes+" video-active");
    }

    render(){
        var src = "https://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/videos/introvideo.mp4";
        var classes = "introVideo";
        var controls = false;
        var volume = 0.5;
        var loop = false;
        var width = window.innerWidth;
        var poster = "https://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/intro.poster.jpg";
        var styles = {
			marginTop: this.props.top
        }

        return (
            <div className="video intro-video" style={styles}>
            	<div className="video-overlay" onClick={this.playVideo}></div>
            	<video poster={poster} src={src} className={classes} controls={controls} volume={volume} loop={loop} width={width} ref="introvideo"></video>
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
        	showSkip: false,
        	videoTop: 0
        }
        this.introSkip = _.bind(this.introSkip, this);        
        this.videoPosition = _.bind(this.videoPosition, this);
    }

    componentDidMount() {
		Application.pipe.on(StaticAssetsStoreEvents.COMPLETE, (progress)=>{
			this.setState({
				showSkip: true
			})
		});

		window.addEventListener('resize', this.videoPosition, false);
		this.videoPosition();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.videoPosition);
	}

	videoPosition() {
		var videoTop = 0;

		var el = React.findDOMNode(this.refs.video);

		var height = window.innerHeight;
		var width = window.innerWidth;

		if ( height > width ){
			videoTop = (height / 2) - (el.clientHeight / 2);
		}

		this.setState({
			videoTop: videoTop
		})
	}

	introSkip(){
		if ( !IntroEvents.SKIP ){
			Application.pipe.emit(IntroEvents.SKIP, "skipped");
		}
	}

    render(){
    	var skip = this.state.showSkip ? <button onClick={this.introSkip} key="2" className="skip-intro">Skip Video</button> : "";

        return (
            <main className="mobile-intro">
            	<TransitionGroup component="div" transitionName="section">
	                <IntroVideoComponent key="1" ref="video" top={this.state.videoTop} />
	                {skip}
	            </TransitionGroup>
            </main>
        )
    }
}
