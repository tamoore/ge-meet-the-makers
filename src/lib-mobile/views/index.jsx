/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';

import React from 'react';

import { DataEvents, Data } from '../data/data';
import { MainEvents } from '../main.jsx!';
import { FilterButtonComponent } from './filterbutton.jsx!';
import { FilterNavComponent } from './filternav.jsx!';
import { TimelineHeadComponent } from './timelinehead.jsx!';
import { TimelineComponent } from './timeline.jsx!';

export class IndexComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            data: Data.result.length ? Data.result : this.attachDataHandler(),
            currentMaker: null
        }

        Application.pipe.on(MainEvents.FILTERMAKERS,(makerId)=>{
        	this.setState({ 
        		currentMaker: makerId
        	});
        });
    }

    attachDataHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleDataUpdate, this));
    }

    handleDataUpdate(resp){
        this.setState({
            data: resp
        })
    }
    
    render(){
        return (
            <main className="mobile-timeline">
				<FilterButtonComponent makerId={this.state.currentMaker} />
                <FilterNavComponent makerId={this.state.currentMaker} />
				<TimelineHeadComponent makerId={this.state.currentMaker} />
				<TimelineComponent makerId={this.state.currentMaker} data={this.state.data} />
			</main>
        )
    }
}