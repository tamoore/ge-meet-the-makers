/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';

import React from 'react';

import { DataEvents, Data } from '../data/data';
import { MainEvents, MakersData } from '../main.jsx!';
import { FilterButtonComponent, FilterNavComponent, TimelineHeadComponent, TimelineComponent } from './timeline.jsx!';

export class IndexComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            data: Data.result.length ? Data.result : this.attachDataHandler(),
            makerData: {},
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

	componentDidMount() {
		$.ajax({
			url: "../lib-mobile/data/makers.json",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({makerData: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error("doh");
			}.bind(this)
		});
	}
    
    render(){
    	var bgImg = "../images/bg.blur.jpg";
    	var maker = null;

    	if ( this.state.currentMaker ){
    		bgImg = this.state.makerData[this.state.currentMaker].furniture.bgImg;
    		maker = this.state.makerData[this.state.currentMaker];
    	}

        return (
            <main className="mobile-timeline" style={{backgroundImage: "url("+bgImg+")"}}>
            	<div className="texture-overlay"></div>
				<FilterButtonComponent maker={maker} />
                <FilterNavComponent makerId={this.state.currentMaker} makers={this.state.makerData} />
				<TimelineHeadComponent makerId={this.state.currentMaker} maker={maker} />
				<TimelineComponent makerId={this.state.currentMaker} data={this.state.data} makers={this.state.makerData} />
			</main>
        )
    }
}