/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';

export class TimelineHeadComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
        return (
			<header className="introduction" data-maker={this.props.makerId}>
				<h1><strong>Innovation<br />never sleeps</strong> Meet the makers</h1>
				<h2><strong>24 hours</strong> in the lives of Australia’s top innovators</h2>
				<i className="icon-down-indicator"></i>
			</header>
        )
    }
}