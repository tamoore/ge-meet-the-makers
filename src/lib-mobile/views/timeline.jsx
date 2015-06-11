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
            data: Data.result.length ? Data.result : this.attachDataHandler()
        }
    }

    attachDataHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleDataUpdate, this));
    }

    /**
     * ReactJS method
     * @returns {XML}
     */
    render(){

    	console.log(this.state.data);

        return (
        	<ol className="timeline-list">
	        	<li className="timeline-list-marker">
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
				<li className="timeline-list-marker">
					<div className="timeline-content-quote timeline-marker-meta">
						<blockquote className="title">This is a title for this piece of content. Bold. Focused. Light.</blockquote>
						<h3 className="citation"><strong>Engineer</strong> Michael J Fox</h3>
					</div>
				</li>
	        </ol>
        )
    }
}