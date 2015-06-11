/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';

import { DataEvents, Data } from '../data/data';
import { MainEvents } from '../main.jsx!';

export class TimelineComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            data: Data.result.length ? Data.result : this.attachDataHandler(),
            timelineItems: [],
            currentMaker: null
        }

        Application.pipe.on(MainEvents.FILTERMAKERS,(makerId)=>{ 
        	this.setState({ 
        		currentMaker: makerId,
        		timelineItems: this.buildTimelineList(this.state.data)
        	});
        	console.log(makerId);
        });
    }

    attachDataHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleDataUpdate, this));
    }

    handleDataUpdate(resp){
        this.setState({
            data: resp,
            timelineItems: this.buildTimelineList(this.state.data)
        })
    }

    componentDidMount(){
    	this.setState({
            timelineItems: this.buildTimelineList(this.state.data)
        });
    }

	buildTimelineList(timelineData){
		var items = [];

		for ( var i = 0; i < timelineData.length; i++ ){
    		var item = timelineData[i];
    		var hidden = false;
    		
    		if ( !this.state.currentMaker && item.maker !== this.state.currentMaker ){
    			hidden = true;
    		}
    		
    		switch ( item.type ){
    			case "post":
    				items.push(this.buildPost(i, item, hidden));
    				break;
    			case "video":
    				items.push(this.buildVideo(i, item, hidden));
    				break;
    			default:
    		}
    	}

    	console.log('updated');

    	return items;
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
        return (
        	<ol className="timeline-list">
	        	{this.state.timelineItems}
	        </ol>
        )
    }
}