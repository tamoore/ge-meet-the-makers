import Hammer from 'hammerjs';
import config from "../config";
import { Base } from './base';

let timeline = undefined;
export class TimelineEmitter extends Base {
    constructor(view){
        super();
        if (view==null) return;
        
        this.config = config.timeline;
        this.currentOffset = 0;
        this.timelineMC = new Hammer(view);
        this.timelineMC.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        this.timelineMC.on('panleft panright', _.bind(this.handlePan, this));
        this.timelineMC.on('panend', _.bind(this.handlePanEnd, this));


        this.on(TimelineEmitter.PANEND, _.bind(this.release, this));

        // Inertia
        this._velocityTracking = []

    }
    track(event){
        this._velocityTracking.push(event.velocity);
        this._direction = event.direction;
        this._event = event;
        this._amplitude = 0;
    }

    release(){
        this._velocityOverall = _.sum(this._velocityTracking)/this._velocityTracking.length;
        this._amplitude = 100 * this._velocityOverall;

    }

    getImageId(offset){
        return  Math.abs(Math.ceil(offset/this.config.INTERVAL));
    }

    handlePan(event){
        let offset = event.deltaX;
        this.currentOffset = this.currentOffset + (offset/this.config.SENSITIVITY);
        this.track(event);
        this.trigger(TimelineEmitter.PAN, this.currentOffset, this.getImageId(this.currentOffset), event);
    }

    handlePanEnd(event){
        //console.log(event);
        this.trigger(TimelineEmitter.PANEND, this.getImageId(this.currentOffset));
    }

}
TimelineEmitter.PAN = "timeline:pan";
TimelineEmitter.PANEND = "timeline:panend";
TimelineEmitter.DIRECTION_LEFT = 2;
TimelineEmitter.DIRECTION_RIGHT = 4;


export class TimelineFactory {
    constructor(view){
        if(!timeline){
            timeline = new TimelineEmitter(view);
            return timeline;
        }else{
            return timeline;
        }


    }
}


