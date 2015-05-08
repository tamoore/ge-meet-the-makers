import { Application } from '../index';
import { BaseView } from './base';
import { TimelineScrollEmitter } from '../emitters/timelineScroll';

export class ClockView extends BaseView {
    constructor(...args){
        super(...args);
        this.now = new Date();

        var hours = this.now.getHours();
        var	minutes = this.now.getMinutes();
        var clock = this.el;

        this.m = (((minutes + 7.5)/15 | 0) * 15) % 60;
        this.h = ((((minutes/105) + .5) | 0) + hours) % 24;
        this.correction = 575;

        // Create offset measurement for scroller
        // Entire scroller = 96 blocks of 15 minutes (add another two units for spacer between 00 and 24)

        var offsetHours = parseInt(hours) * 4;
        var offsetMinutes = Math.round( minutes / 15 );

        clock.setAttribute('data-start', offsetHours + offsetMinutes);

        // Set clock hands
        var handHour = document.getElementById('handHour');
        var handMinute = document.getElementById('handMinute');

        // Subtract 90 degrees to account for the start position
        var rotateMinute = ( parseInt(minutes) * 6 ) - 90;
        var rotateHour = ( parseInt(hours) * 30 ) + ( parseInt(minutes) / 2 ) - 90;

        handHour.style.webkitTransform = 'rotate('+rotateHour+'deg)';
        handHour.style.mozTransform    = 'rotate('+rotateHour+'deg)';
        handHour.style.msTransform     = 'rotate('+rotateHour+'deg)';
        handHour.style.oTransform      = 'rotate('+rotateHour+'deg)';
        handHour.style.transform       = 'rotate('+rotateHour+'deg)';

        handMinute.style.webkitTransform = 'rotate('+rotateMinute+'deg)';
        handMinute.style.mozTransform    = 'rotate('+rotateMinute+'deg)';
        handMinute.style.msTransform     = 'rotate('+rotateMinute+'deg)';
        handMinute.style.oTransform      = 'rotate('+rotateMinute+'deg)';
        handMinute.style.transform       = 'rotate('+rotateMinute+'deg)';

        // Format minutes with leading zero
        var formatHour = ( hours < 10 ) ? "0" + hours : hours;
        var formatMinute = ( minutes < 10 ) ? "0" + minutes : minutes;

        // Set clock local time
        var time = formatHour + ":" + formatMinute;
        clock.innerHTML = time;
        this.position = this.calculatePosition();
        Application.pipe.trigger(ClockView.POSITION, Math.abs( this.position ));
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
        return (((this.h * 4) + maddition)* TimelineScrollEmitter.INTERVAL)-this.correction;

    }
}
ClockView.POSITION = "clockview:position";