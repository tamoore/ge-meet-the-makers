import config from '../config';
import easeljs from 'easeljs';

import React from 'react';
import Hammer from 'hammerjs';

import { Application } from '../index';
import { ClockViewEvents } from './clock.jsx!';
import { BaseView } from './base';
import { StaticAssetsStore, StaticAssetsStoreEvents } from '../emitters/staticAssets';
import { AmbientVideoEmitterEvent } from '../emitters/ambientVideo';

export const TimelineEvents = {
    PAN: "timeline:pan",
    PANEND: "timeline:panend"
}

export const TimelineProps = {
    INTERVAL: 50
}

export class TimelineBackgroundComponent extends React.Component {
    constructor(){
        super();

        Application.pipe.on(AmbientVideoEmitterEvent.PLAYING, _.bind(this.handleVideoPlaying, this));
        Application.pipe.on(StaticAssetsStoreEvents.SEND_RESULT, _.bind(this.addBitMapToStage, this))
        Application.pipe.on(TimelineEvents.PANEND, _.bind(this.handleTimeLinePanEnd, this));

    }

    componentDidMount(){
        this.stage = new createjs.Stage(React.findDOMNode(this.refs.Stage));
        createjs.Ticker.setFPS(32);
        createjs.Ticker.addEventListener("tick", this.stage);
    }
    stageUpdate(image){
        this.container = new createjs.Container()
        this.container.addChild(image);
        this.stage.addChild(this.container);
        this.stage.update();

    }

    handleFileLoaded(event){
        //console.log("File Loaded:", event);
    }

    handleTimeLinePanEnd(imageid) {
        Application.pipe.emit(AmbientVideoEmitterEvent.VIDEO_SRC, '01', imageid);
    }

    handleVideoPlaying(video){
        if(video){
            video.scaleX = 1.05;
            video.scaleY = 1.05;
            this.stageUpdate(video);
        }
    }

    handlePreloadComplete(event){
        Application.pipe.emit(StaticAssetsStoreEvents.GET_RESULT, this.generateImageLink(1));
    }

    getformattedId(imageid){
        if(this.stage){
            this.stage.removeAllChildren();
        }

        return (imageid < 10 ? '0'+imageid : imageid)
    }

    generateImageLink(imageid){
        return "maker01_"+ this.getformattedId(imageid) +"_jpg";
    }

    addBitMapToStage(image){
            if(!image)return
            this.stageUpdate( new createjs.Bitmap(image) );
    }

    render(){
        Application.pipe.emit(StaticAssetsStoreEvents.GET_RESULT, this.generateImageLink(this.props.imageid));
        return (
            <div>
                <div className="bg-filter"></div>
                <canvas ref="Stage" id="ambientvideos" width="640" height="360" className="bg"></canvas>
            </div>

        )
    }

}

export class TimeLineItem extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
        this._rnd = Math.floor(Math.random() * (8 - 0) + 0);
        this.items = [];
        for(var i = 0;i<this._rnd;i++){
            this.items.push(<li><a><span className="assistive-text">Content title</span></a></li>)
        }
    }
    render(){
        if(this.props.hourLabel){
            var hourMarker = <span className="marker-label">{this.props.hourLabel}:00</span>;
        }


        return (
            <li className="timeline-marker timeline-marker-start" data-time="0:00">
                <div className="marker-data">
                    <ul>
                        {this.items}
                    </ul>
                </div>
                <span className="marker-line marker-line-start"></span>
                <span className="marker-tick marker-tick-long"></span>
                {hourMarker}
            </li>
        )
    }
}



export class TimelineListView extends React.Component {
    constructor(){
        super();
        this.x = 0;
        //get the browser transform prefix
        ['Webkit', 'Moz', 'O', 'ms'].every(_.bind(function (prefix) {
            let e = prefix + 'Transform';
            if(typeof document.createElement("div").style[e] !== 'undefined'){
                this.xform = e;
                return false;
            }
            return true;
        },this));

    }
    render(){
        var styles = {};
        var itemsTemp = [];
        var hourref;

        for(var i=0;i<96;i++){
            if((i % 4) == 0){
                hourref = i;
                var hour = ((i/4) < 10 ? '0'+(i/4) : (i/4));
                var minute = '00';

            }else{
                var hour = null;
                var minute;
                switch(i-hourref){
                    case 1:
                        minute = '15';
                        break;
                    case 2:
                        minute = '30';
                        break;
                    case 3:
                        minute = '45';
                        break;
                    default:
                        minute = '00';
                        break;
                }
            }
            itemsTemp.push(<TimeLineItem hourLabel={hour} hour={hour} minute={minute} />);
        }
        styles[this.xform] = 'translateX(' + (-this.props.offset) + 'px)'
        return (
            <ol id="timelineList" className="timeline-list" style={styles}>
                {itemsTemp}
            </ol>
        )
    }
}

export class TimelineWrapperViewComponent extends React.Component {

    constructor(){
        super();

        this.state = {
            offset: 0
        };

        this.config = config.timeline;
        this.currentOffset = 0;
        this.max = 4836;
        this.offset = this.min = 0;
        this.pressed = false;
        this.xform = 'transform';
        this.timeConstant = 325;
        this.snap = TimelineProps.INTERVAL;


        Application.pipe.on(ClockViewEvents.POSITION, _.bind(this.scroll, this));
        Application.pipe.on(ClockViewEvents.POSITION, (scrollx)=>{
            Application.pipe.emit(TimelineEvents.PANEND, this.getImageId(scrollx));
        });


    }

    componentDidMount(){
        this.applyEvents()
    }

    xpos(e){
        if (e.srcEvent.targetTouches && (e.srcEvent.targetTouches.length >= 1)) {
            return e.srcEvent.targetTouches[0].clientX;
        }

        // mouse event
        return e.srcEvent.clientX;
    }

    applyEvents(){
        this.timelineHammer = new Hammer(React.findDOMNode(this.refs.Timeline));
        this.timelineHammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        this.timelineHammer.on('panstart', _.bind(this.tap, this));
        this.timelineHammer.on('pan', _.bind(this.drag, this));
        this.timelineHammer.on('panend', _.bind(this.release, this));
    }


    tap(e){
        this.pressed = true;
        this.reference = this.xpos(e);
        this.velocity = this.amplitude = 0;
        this.frame = this.offset;
        this.timestamp = Date.now();
        clearInterval(this.ticker);
        this.ticker = setInterval(_.bind(this.track, this), 100);


        return false;
    }

    track(){
        var now, elapsed, delta, v;

        now = Date.now();
        elapsed = now - this.timestamp;
        this.timestamp = now;
        delta = this.offset - this.frame;
        this.frame = this.offset;
        v = 100 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;

    }

    drag(e){
        var x, delta, scrollx;
        if (this.pressed) {
            x = this.xpos(e);
            delta = this.reference - x;
            if (delta > 2 || delta < -2) {
                this.reference = x;
                scrollx = this.offset + delta
                this.scroll(scrollx);
            }
        }
        return false;
    }

    release(e){
        this.pressed = false;

        clearInterval(this.ticker);
        if (this.velocity > 10 || this.velocity < -10) {
            this.amplitude = 0.8 * this.velocity;
            this.target = Math.round(this.offset + this.amplitude);
            this.timestamp = Date.now();
            requestAnimationFrame(_.bind(this.autoScroll, this));
        }
        Application.pipe.emit(TimelineEvents.PANEND, this.getImageId(this.offset));
        return false;

    }

    autoScroll(){
        var elapsed, delta, scrollx;
        if (this.amplitude) {
            elapsed = Date.now() - this.timestamp;
            delta = -this.amplitude * Math.exp(-elapsed / this.timeConstant);
            if (delta > 0.5 || delta < -0.5) {
                scrollx = this.target + delta
                this.scroll(scrollx);
                requestAnimationFrame(_.bind(this.autoScroll, this));
            } else {
                scrollx = Math.round(this.target / this.snap) * this.snap;
                this.scroll(scrollx);
                Application.pipe.emit(TimelineEvents.PANEND, this.getImageId(scrollx));
            }
        }
    }

    scroll(x){
        this.offset = (x > this.max) ? this.max : (x < this.min) ? this.min : x;
        console.log(this.offset);
        this.setState({
            offset: this.offset,
            imageid: this.getImageId(this.offset)
        })
       // console.log(this.offset);
        //Application.pipe.emit(Timeline.PAN, this.getImageId(this.offset));
        //this.indicator.style[xform] = 'translateX(' + (this.offset * this.relative) + 'px)'
    }

    getImageId(offset){
        let id = Math.abs(Math.ceil(offset/this.config.INTERVAL));
        if(id == 0){
            id = 1
        }
        return  id;
    }

    render(){
        return (
            <section>
                <TimelineBackgroundComponent imageid={this.state.imageid} />
                <section ref="Timeline" id="timelineWrapper" className="timeline">
                    <TimelineListView offset={this.state.offset}  />
                </section>
            </section>
        )
    }

}