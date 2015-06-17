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
        return (
			<button id="filterTrigger" className={this.props.maker ? "icon-industry icon-industry-"+this.props.maker.furniture.icon+" filter-trigger" : "icon-industry icon-filter filter-trigger"} data-maker={this.props.maker ? this.props.maker.id : "null"}></button>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class FilterNavItemComponent extends React.Component {

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
    	var m = this.props.data;
    	var icon;
    	if ( m.id ){
    		icon = this.props.makerId == m.id ? "selected icon-industry-"+m.furniture.icon : "icon-industry-"+m.furniture.icon
    	} else {
    		icon = this.props.makerId == m.id ? "selected icon-"+m.furniture.icon : "icon-"+m.furniture.icon
    	}
    	
        return (
		    <li key={this.props.key}>
		        <button data-industry={m.furniture.icon} onClick={this.handleClick} rel={m.id} className={icon}>
		        	<span className="assistive-text">{m.furniture.icon}</span>
		        </button>
		    </li>
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
    }

    render(){
    	var filterItems = [];
		var maker = this.props.makerId;

		_.forEach(this.props.makers, function(item) {
    		filterItems.push(<FilterNavItemComponent key={item.id} data={item} makerId={maker} />);
		});

		filterItems.push(<FilterNavItemComponent key="0" data={{ id: null, furniture: { icon: "close" } }} makerId={maker} />);

        return (
			<ul className="timeline-filter">
			    {filterItems}
			</ul>
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
    		icon = "",
    		c = "introduction";

    	if ( this.props.makerId ){
    		if ( !_.isEmpty(this.props.maker) ){
	    		ha = "<h1><strong>"+this.props.maker.role+"</strong>"+this.props.maker.name+"</h1>";
	    		icon = '<i class="icon-industry icon-industry-'+this.props.maker.furniture.icon+'"></i>';
	    		c = c+" maker-intro";
    		}
    	} else {
    		ha = "<h1><strong>Innovation<br />never sleeps</strong> Meet the makers</h1>";
    	}

    	return (
			<header className={c} data-maker={this.props.makerId}>
				<span dangerouslySetInnerHTML={{__html: ha}}></span>
				<h2><strong>24 hours</strong> in the lives of Australia’s top innovators</h2>
				<div dangerouslySetInnerHTML={{__html: icon}}></div>
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