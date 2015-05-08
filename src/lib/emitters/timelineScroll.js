import Hammer from 'hammerjs';
import config from '../config';

import { Application } from '../index';
import { ClockView } from '../views/clock';
import { Base } from './base';

let timeline = undefined;
export class TimelineScrollEmitter extends Base {
    constructor(view, listId){
        super();
        if (view==null) return;

        this.view = view;
        this.listView = document.getElementById(listId);
        this.config = config.timeline;
        this.currentOffset = 0;
        this.maxWidth = 4900;
        this.offset = this.min = 0;
        this.pressed = false;
        this.xform = 'transform';
        this.timeConstant = 325;
        this.snap = TimelineScrollEmitter.INTERVAL + 25;



        //get the browser transform prefix
        ['webkit', 'Moz', 'O', 'ms'].every(_.bind(function (prefix) {
            let e = prefix + 'Transform';
            if(typeof view.style[e] !== 'undefined'){
                this.xform = e;
                return false;
            }
            return true;
        },this));


        this.applyEvents();

        Application.pipe.on(ClockView.POSITION, _.bind(this.scroll, this));
        Application.pipe.on(ClockView.POSITION, (scrollx)=>{
            this.trigger(TimelineScrollEmitter.PANEND, this.getImageId(scrollx));
        });
    }

    xpos(e){
        if (e.srcEvent.targetTouches && (e.srcEvent.targetTouches.length >= 1)) {
            return e.srcEvent.targetTouches[0].clientX;
        }

        // mouse event
        return e.srcEvent.clientX;
    }

    applyEvents(){
        this.timelineHammer = new Hammer(this.view);
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
        v = 500 * delta / (1 + elapsed);
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
                this.scroll(this.offset + delta);
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
        return false;

    }

    autoScroll(){
        var elapsed, delta, scrollx;
        if (this.amplitude) {
            elapsed = Date.now() - this.timestamp;
            delta = -this.amplitude * Math.exp(-elapsed / this.timeConstant);
            console.log(delta);
            if (delta > 0.5 || delta < -0.5) {
                scrollx = this.target + delta
                this.scroll(scrollx);
                requestAnimationFrame(_.bind(this.autoScroll, this));
            } else {
                scrollx = Math.round(this.target / this.snap) * this.snap;
                this.scroll(scrollx);
                this.trigger(TimelineScrollEmitter.PANEND, this.getImageId(scrollx));
            }
        }
    }

    scroll(x){
        this.offset = (x > this.max) ? this.max : (x < this.min) ? this.min : x;
        this.listView.style[this.xform] = 'translateX(' + (-this.offset) + 'px)';
        this.trigger(TimelineScrollEmitter.PAN, this.getImageId(this.offset))
        //this.indicator.style[xform] = 'translateX(' + (this.offset * this.relative) + 'px)'
    }

    getImageId(offset){
        let id = Math.abs(Math.ceil(offset/this.config.INTERVAL));
        if(id == 0){
            id = 1
        }
        return  id;
    }

}

TimelineScrollEmitter.PAN = "timeline:pan";
TimelineScrollEmitter.PANEND = "timeline:panend";
TimelineScrollEmitter.INTERVAL = 50;

export class TimelineFactory {
    constructor(view, listid){
        if(!timeline){
            timeline = new TimelineScrollEmitter(view, listid);
            return timeline;
        }else{
            return timeline;
        }


    }
}


