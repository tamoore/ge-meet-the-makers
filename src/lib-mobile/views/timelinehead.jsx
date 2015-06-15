/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export class TimelineHeadComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var maker = "Maker "+this.props.makerId;

        return (
			<TransitionGroup component="header" className="introduction" data-maker={this.props.makerId} transitionName="section">
				<h1><strong>Innovation<br />never sleeps</strong> Meet the makers</h1>
				<h2><strong>24 hours</strong> in the lives of Australia’s top innovators</h2>
				<h2>{maker}</h2>
				<i className="icon-down-indicator"></i>
			</TransitionGroup>
        )
    }
}