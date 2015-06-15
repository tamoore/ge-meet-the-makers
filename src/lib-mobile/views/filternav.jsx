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
        return (
			<ul className="timeline-filter">
			    <li>
			        <button data-industry="space" onClick={this.handleClick} rel="1">
			        	<span className="assistive-text">Space</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="factory" onClick={this.handleClick} rel="2">
			        	<span className="assistive-text">Factory</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="fuel" onClick={this.handleClick} rel="3">
			        	<span className="assistive-text">Fuel</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="energy" onClick={this.handleClick} rel="4">
			        	<span className="assistive-text">Energy</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="transport" onClick={this.handleClick} rel="5">
			        	<span className="assistive-text">Transport</span>
			        </button>
			    </li>
			    <li>
			        <button data-industry="medical" onClick={this.handleClick} rel="6">
			        	<span className="assistive-text">Medical</span>
			        </button>
			    </li>
			    <li>
			        <button onClick={this.handleClick} rel="">
			        	<span className="assistive-text">Remove Filter</span>
			        </button>
			    </li>
			</ul>
        )
    }
}