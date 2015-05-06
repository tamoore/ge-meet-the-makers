import Hammer from 'hammerjs';
import config from "../config";
import { Base } from './Base';

let timeline = undefined;
export class TimelineEmitter extends Base {
    constructor(view){
        super();
        this.config = config.timeline;
        this.currentOffset = 0;
        this.timelineMC = new Hammer(view);
        this.timelineMC.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        this.timelineMC.on('panleft panright', _.bind(this.handlePan, this));
        this.timelineMC.on('panend', _.bind(this.handlePanEnd, this));


    }
    getImageId(){
        return  Math.abs(Math.ceil(this.currentOffset/this.config.INTERVAL));
    }

    handlePan(event){
        let offset = event.deltaX;
        this.currentOffset = this.currentOffset + (offset/this.config.SENSITIVITY);
        this.trigger(TimelineEmitter.PAN, this.currentOffset, this.getImageId());
    }

    handlePanEnd(event){
        this.trigger(TimelineEmitter.PANEND, this.getImageId());
    }

}
TimelineEmitter.PAN = "timeline:pan";
TimelineEmitter.PANEND = "timeline:panend";

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


