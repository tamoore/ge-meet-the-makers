import React from 'react';
import { Application } from '../index';
import { BaseView } from './base';
import { TimelineProps, TimelineEvents, TimelineComponent } from './timeline.jsx!';

export const ClockViewEvents = {
    POSITION: "clockview:position",
    GETPOSITION: "clockview:getposition"
}

/**
 * ClockView Properties
 * @type {{INCREMENT: number}}
 */
export const ClockViewProps = {
    INCREMENT: 3.333,
    TOTAL: 1440
}

/**
 * Base class for clock
 */
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
/**
 * Component for the minute hand
 */
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
/**
 * Component for the hour hand
 */
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

/**
 * Clockview Manages how the clock appears in the application
 * @class
 * @reactComponent
 *
 */
export class ClockView extends ClockBase {
    constructor(){
        super();
        this.now = new Date();
        var hours = this.now.getHours();
        var	minutes = this.now.getMinutes();

        this.state = {
            styles: {
                opacity: 0
            }
        }

        /**
         * Minutes number
         * @type {number}
         */
        this.m = (((minutes + 7.5)/15 | 0) * 15) % 60;
        /**
         * Hour number
         * @type {number}
         */
        this.h = ((((minutes/105) + .5) | 0) + hours) % 24;

        // Create offset measurement for scroller
        // Entire scroller = 96 blocks of 15 minutes (add another two units for spacer between 00 and 24)
        var offsetHours = parseInt(hours) * 4;
        var offsetMinutes = Math.round( minutes / 15 );

        this.data =  offsetHours + offsetMinutes;

        // Subtract 90 degrees to account for the start position
        [this.rotateHour, this.rotateMinue] = this.generateRotation(hours,minutes);

        // Format minutes with leading zero
        this.formatHour = ( hours < 10 ) ? "0" + hours : hours;
        this.formatMinute = ( minutes < 10 ) ? "0" + minutes : minutes;


        this.position = this.calculatePosition();

        Application.pipe.on(TimelineEvents.PAN, _.bind(this.handleTimelinePanning, this));
        TimelineComponent.clockPosition = this.position;
    }

    /**
     * ReactJS method
     */
    componentDidMount(){
        /**
         * State property update
         */
        this.setState({
            hour: this.formatHour,
            minute: this.formatMinute,
            hourRotation: this.rotateHour,
            minuteRotation: this.rotateMinue
        });
        ClockView.hour = this.formatHour;
        Application.pipe.emit(TimelineEvents.PANEND, ClockView.hour);
        Application.pipe.emit(ClockViewEvents.POSITION, Math.abs( this.position ));
        Application.pipe.emit(TimelineEvents.GET_IMAGE);
        setTimeout(()=>{
            this.setState({
                styles: {
                    opacity: 1
                }
            })
        }, 750)

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
    generateRotation(hours,minutes){
        let rotatedMinute, rotatedHour;
        rotatedMinute = ( parseInt(minutes) * 6 ) - 90;
        rotatedHour = ( parseInt(hours) * 30 ) + ( parseInt(minutes) / 2 ) - 90;
        return [rotatedHour, rotatedMinute]
    }

    /**
     * Receieves the timeline offset
     * @param offset {number} timeline offset value
     */
    handleTimelinePanning(offset){
        let float = (offset/ClockViewProps.INCREMENT)/60;
        let hour = (Math.floor(float));
        ClockView.hour = (hour < 10 ? '0'+hour : hour );
        let minute = Math.floor(60*(float % 1))
        let [roatedHours, rotatedMinutes] = this.generateRotation(hour,minute);
        this.setState({
            hour: (hour < 10 ? '0'+hour : hour ),
            minute: (minute < 10 ? '0'+minute : minute ),
            hourRotation: roatedHours,
            minuteRotation: rotatedMinutes
        });

    }

    render(){
        return (
            <div className="chrono" style={this.state.styles}>
                <div className="chrono-clock">
                    <HandHourComponent rotation={this.state.hourRotation} />
                    <HandMinuteComponent rotation={this.state.minuteRotation} />
                </div>
                <div className="chrono-time" id="localTime">{this.state.hour}:{this.state.minute}</div>
            </div>
        )
    }
}
ClockView.hour = null;