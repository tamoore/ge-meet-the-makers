/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export class TimelineComponent extends React.Component {

    constructor(){
        super();
    }

	buildPost(i, itemData){
		return (
			<li key={i} className="timeline-list-marker">
				<header className="maker-details timeline-marker-meta">
					<i className="icon-industry icon-industry-transport"></i>
					<time>{itemData.metadata.timeline.hour}:{itemData.metadata.timeline.minute}</time>
					<div className="profile">
						<h3>Engineer</h3>
						<h2>John Oliver</h2>
					</div>
					<img src="../images/thumb.png" alt="" />
				</header>
				<div className="timeline-content-preview">
					<div className="preview-media mask-skew">
						<img src="../images/bio.holder.jpg" alt="HOLDER TO TEST SKEW" />
					</div>
					<div className="timeline-content-meta">
						<i className={"icon-content-type icon-content-"+itemData.type}></i>
						<span className="label-content-type">{itemData.type}</span>
					</div>
					<h2 className="title">{itemData.title}</h2>
				</div>
			</li>
		)
	}

    render(){
		var timelineItems = [];

		for ( var i = 0; i < this.props.data.length; i++ ){
    		var item = this.props.data[i];
    		var hidden = false;
    		
    		if ( !this.props.makerId || item.maker == this.props.makerId ){
	    		timelineItems.push(this.buildPost(i, item));
    		}
    	}

        return (
        	<TransitionGroup component="ol" className="timeline-list" data-maker={this.props.makerId} transitionName="section">
		        {timelineItems}
		    </TransitionGroup>
        )
    }
}