import React from 'react';
import { Application } from '../index';
import { BaseView } from './base';
import { TimelineProps } from './timeline.jsx!';

export const ClockViewEvents = {
    POSITION: "clockview:position"
}

class ClockBase extends React.Component {
    constructor(){
        super();
        this.xform = 'transform';
        var el = document.createElement("div");
        ['Webkit', 'Moz', 'O', 'ms'].every(_.bind(function (prefix) {
            let e = prefix + 'Transform';
            if(typeof el.style[e] !== 'undefined'){
                this.xform = e;
                return false;
            }
            return true;
        },this));
    }
}

class HandMinuteComponent extends ClockBase {
    constructor(){
        super();
    }
    render(){
        var styles = {};
        styles[this.xform] = 'rotate('+this.props.rotation+'deg)';
        return (
            <span className="chrono-clock--hand-minute" id="handMinute" style={styles}><i></i></span>
        )
    }
}

class HandHourComponent extends ClockBase {
    constructor(){
        super();

    }
    render(){
        var styles = {};
        styles[this.xform] = 'rotate('+this.props.rotation+'deg)';

        return (
            <span className="chrono-clock--hand-hour" id="handHour" style={styles}><i></i></span>
        )
    }
}


export class ClockView extends ClockBase {
    constructor(){
        super();
        this.now = new Date();
        var hours = this.now.getHours();
        var	minutes = this.now.getMinutes();


        this.m = (((minutes + 7.5)/15 | 0) * 15) % 60;
        this.h = ((((minutes/105) + .5) | 0) + hours) % 24;
        this.correction = 1000;

        // Create offset measurement for scroller
        // Entire scroller = 96 blocks of 15 minutes (add another two units for spacer between 00 and 24)

        var offsetHours = parseInt(hours) * 4;
        var offsetMinutes = Math.round( minutes / 15 );

        this.data =  offsetHours + offsetMinutes;


        // Set clock hands
        var handHour = document.getElementById('handHour');
        var handMinute = document.getElementById('handMinute');

        // Subtract 90 degrees to account for the start position
        this.rotateMinue = ( parseInt(minutes) * 6 ) - 90;
        this.rotateHour = ( parseInt(hours) * 30 ) + ( parseInt(minutes) / 2 ) - 90;

        // Format minutes with leading zero
        this.formatHour = ( hours < 10 ) ? "0" + hours : hours;
        this.formatMinute = ( minutes < 10 ) ? "0" + minutes : minutes;

        // Set clock local time
        //var time = formatHour + ":" + formatMinute;
        //clock.innerHTML = time;
        this.position = this.calculatePosition();
        console.log(this.position);
        Application.pipe.emit(ClockViewEvents.POSITION, Math.abs( this.position ));

    }

    get position(){
        return this._position;
    }
    set position(pos){
        this._position = pos;
    }

    calculatePosition(){
        var maddition;
        switch(this.m){
            case 0:
                maddition = 0;
                break;
            case 15:
                maddition = 1;
                break;
            case 30:
                maddition = 2;
                break;
            case 45:
                maddition = 3;
                break;
        }
        return (((this.h * 4) + maddition)* TimelineProps.INTERVAL);

    }

    render(){
        return (
            <div className="chrono">
                <div className="chrono-clock">
                    <HandHourComponent rotation={this.rotateHour} />
                    <HandMinuteComponent rotation={this.rotateMinue} />
                </div>
                <div className="chrono-time" id="localTime">{this.formatHour}:{this.formatHour}</div>
            </div>
        )
    }
}
