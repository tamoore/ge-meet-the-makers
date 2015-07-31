/**
 * Index View
 */
import { MobileApplication } from '../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../main.jsx!';
import { TimelineHeadComponent, TimelineComponent } from './timeline.jsx!';

/**
 * Component for Index View
 */
export class IndexComponent extends React.Component {

    constructor(){
        super();
        this.state = {
        	height: MainEvents.VIEWPORT.height
        }
    }

	componentDidMount() {
		// Show the Timeline Filter
		MobileApplication.pipe.emit(MainEvents.HIDEFILTER, false);
	}
    
    render(){
    	var { makerId, data, makerData } = this.props;

    	// Set view defaults
    	var bgImg = MainDefaults.BGIMAGE;
    	var maker = null;

    	// Update if Maker chosen
    	if ( makerId ){
    		bgImg = makerData[makerId].bgImg;
    		maker = makerData[makerId];
    	}

        return (
            <main className="mobile-timeline" style={{backgroundImage: "url("+bgImg+")", minHeight: this.state.height}}>
            	<div className="texture-overlay"></div>
				<TimelineHeadComponent maker={maker} />
				<TimelineComponent makerId={makerId} data={data} makerData={makerData} />
			</main>
        )
    }
}