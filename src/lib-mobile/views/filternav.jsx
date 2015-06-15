/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';

import { MainEvents } from '../main.jsx!';

export class FilterNavComponent extends React.Component {

    constructor(){
        super();
        this.handleClick = _.bind(this.handleClick, this);
    }

    handleClick(event){
        let makerId = event.target.getAttribute("rel");
        this.props.makerId == makerId ? makerId = null : false;
        Application.pipe.emit(MainEvents.FILTERMAKERS, makerId);
    }

    render(){
    	var maker = this.props.makerId;
        return (
			<ul className="timeline-filter">
			    <li>
			        <button data-industry="space" onClick={this.handleClick} rel="1" className={maker == "1" ? "selected icon-1" : "icon-1"}>
			        	<span className="assistive-text">Space</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="factory" onClick={this.handleClick} rel="2" className={maker == "2" ? "selected icon-2" : "icon-2"}>
			        	<span className="assistive-text">Factory</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="fuel" onClick={this.handleClick} rel="3" className={maker == "3" ? "selected icon-3" : "icon-3"}>
			        	<span className="assistive-text">Fuel</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="energy" onClick={this.handleClick} rel="4" className={maker == "4" ? "selected icon-4" : "icon-4"}>
			        	<span className="assistive-text">Energy</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="transport" onClick={this.handleClick} rel="5" className={maker == "5" ? "selected icon-5" : "icon-5"}>
			        	<span className="assistive-text">Transport</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="medical" onClick={this.handleClick} rel="6" className={maker == "6" ? "selected icon-6" : "icon-6"}>
			        	<span className="assistive-text">Medical</span>
			        </button>
			    </li>
			    <li>
			        <button onClick={this.handleClick} rel="" className={!maker ? "selected icon-clear" : "icon-clear"}>
			        	<span className="assistive-text">Remove Filter</span>
			        </button>
			    </li>
			</ul>
        )
    }
}