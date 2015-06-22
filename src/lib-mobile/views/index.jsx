/**
 * Index View
 */
import { Application } from '../index';

import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { MainEvents, MainDefaults } from '../main.jsx!';
import { TimelineHeadComponent, TimelineComponent } from './timeline.jsx!';

/**
 * Component for Index View
 */
export class IndexComponent extends React.Component {

    constructor(){
        super();
    }

	componentDidMount() {
		// Show the Timeline Filter
		Application.pipe.emit(MainEvents.HIDEFILTER, false);
	}
    
    render(){
    	var { makerId, data, makerData } = this.props;

    	// Set view defaults
    	var bgImg = MainDefaults.BGIMAGE;
    	var maker = null;

    	// Update if Maker chosen
    	if ( makerId ){
    		bgImg = makerData[makerId].furniture.bgImg;
    		maker = makerData[makerId];
    	}

        return (
            <TransitionGroup component="main" className="mobile-timeline" style={{backgroundImage: "url("+bgImg+")"}} transitionName="section">
            	<div className="texture-overlay"></div>
				<TimelineHeadComponent maker={maker} />
				<TimelineComponent makerId={makerId} data={data} makerData={makerData} />
			</TransitionGroup>
        )
    }
}