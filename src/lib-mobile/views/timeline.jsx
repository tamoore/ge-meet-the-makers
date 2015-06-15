/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';

export class TimelineComponent extends React.Component {

    constructor(){
        super();
    }

	buildVideo(i, itemData, hidden){
		var visClass = "timeline-list-marker";
		if ( hidden ){
			visClass = visClass+" timeline-item-hidden";
		}

		return (
			<li key={i} className={visClass}>
				<header className="maker-details timeline-marker-meta">
					<i className="icon-industry icon-industry-transport"></i>
					<time>01:50</time>
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
						<i className="icon-content-type icon-content-video"></i>
						<span className="label-content-type">Video</span>
					</div>
					<h2 className="title">This is a title for this piece of content. Bold. Focused. Light.</h2>
				</div>
			</li>
		)
	}

	buildPost(i, itemData, hidden){
		var visClass = "timeline-list-marker";
		if ( hidden ){
			visClass = visClass+" timeline-item-hidden";
		}

		return (
			<li key={i} className={visClass}>
				<header className="maker-details timeline-marker-meta">
					<i className="icon-industry icon-industry-transport"></i>
					<time>01:50</time>
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
						<i className="icon-content-type icon-content-video"></i>
						<span className="label-content-type">Video</span>
					</div>
					<h2 className="title">This is a title for this piece of content. Bold. Focused. Light.</h2>
				</div>
			</li>
		)
	}

    render(){
    	console.log('triggered');

		var timelineItems = [];

		for ( var i = 0; i < this.props.data.length; i++ ){
    		var item = this.props.data[i];
    		var hidden = false;
    		
    		if ( !this.props.makerId || item.maker == this.props.makerId ){
    			switch ( item.type ){
	    			case "post":
	    				timelineItems.push(this.buildPost(i, item, hidden));
	    				break;
	    			case "video":
	    				timelineItems.push(this.buildVideo(i, item, hidden));
	    				break;
	    			default:
	    		}
    		}
    	}

        return (
        	<ol className="timeline-list" data-maker={this.props.makerId}>
	        	{timelineItems}
	        </ol>
        )
    }
}