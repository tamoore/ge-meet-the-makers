/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { MainEvents } from '../main.jsx!';

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class FilterButtonComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var maker = this.props.makerId;

        return (
			<button id="filterTrigger" className={maker ? "icon-"+maker+" filter-trigger" : "icon-filter filter-trigger"} data-maker={maker ? maker : ""}></button>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
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

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class htmlWrapComponent extends React.Component {
    
    constructor(){
        super();
    }

    render(){
    	var output = this.props.input;
    	console.log(output);
    	return (
    		{output}
    	)
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class TimelineHeadComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var ha,
    		icon = "";

    	if ( this.props.makerId ){
    		ha = "<h1><strong>"+this.props.maker.role+"</strong>"+this.props.maker.name+"</h1>";
    		icon = '<h2><i className="icon-industry icon-industry-'+this.props.maker.furniture.icon+'"></i></h2>';
    	} else {
    		ha = "<h1><strong>Innovation<br />never sleeps</strong> Meet the makers</h1>";
    	}

    	return (
			<header className="introduction" data-maker={this.props.makerId}>
				<span dangerouslySetInnerHTML={{__html: ha}}></span>
				<h2><strong>24 hours</strong> in the lives of Australia’s top innovators</h2>
				<i className="icon-down-indicator"></i>
			</header>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class TimelineItemComponent extends React.Component {

    constructor(){
        super();
    }

    render(){

    	var d = this.props.data;
    	var m = this.props.maker;

    	if ( !d || !m ){
    		return false;
    	}

    	var hour = d.metadata.timeline.hour.toString().length > 1 ? d.metadata.timeline.hour : "0"+d.metadata.timeline.hour;
    	var minute = d.metadata.timeline.minute.toString().length > 1 ? d.metadata.timeline.minute : "0"+d.metadata.timeline.minute;

        return (
        	<li key={this.props.key} className="timeline-list-marker">
				<header className="maker-details timeline-marker-meta">
					<i className={"icon-industry icon-industry-"+m.furniture.icon}></i>
					<time>{hour}:{minute}</time>
					<div className="profile">
						<h3>{m.role}</h3>
						<h2>{m.name}</h2>
					</div>
					<img src={m.furniture.portraitImg} alt={m.name} />
				</header>
				<div className="timeline-content-preview">
					<div className="preview-media mask-skew">
						<img src={m.furniture.makerImg} alt={d.title} />
					</div>
					<div className="timeline-content-meta">
						<i className={"icon-content-type icon-content-"+d.type}></i>
						<span className="label-content-type">{d.type}</span>
					</div>
					<h2 className="title">{d.title}</h2>
				</div>
			</li>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class TimelineComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
		var timelineItems = [];

		for ( var i = 0; i < this.props.data.length; i++ ){
    		var item = this.props.data[i];
    		
    		if ( !this.props.makerId || item.maker == this.props.makerId ){
    			var maker = this.props.makers[item.maker];
	    		timelineItems.push(<TimelineItemComponent key={i} data={item} maker={maker} />);
    		}
    	}

        return (
        	<ol className="timeline-list" data-maker={this.props.makerId}>
		        {timelineItems}
		    </ol>
        )
    }
}