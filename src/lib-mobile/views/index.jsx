/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';

import React from 'react';

import { TimelineComponent } from './timeline.jsx!';

export class IndexComponent extends React.Component {
    
    constructor(){
        super();
    }
    
    render(){
        return (
            <main className="mobile-timeline">
				<header className="introduction">
					<h1><strong>Innovation<br />never sleeps</strong> Meet the makers</h1>
					<h2><strong>24 hours</strong> in the lives of Australia’s top innovators</h2>
					<i className="icon-down-indicator"></i>
				</header>
				<TimelineComponent />
			</main>
        )
    }
}