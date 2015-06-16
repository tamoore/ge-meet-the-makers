/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';

import React from 'react';

import { DataEvents, Data } from '../data/data';
import { MainEvents, MakersData } from '../main.jsx!';

export class MakersItemComponent extends React.Component {

    constructor(){
        super();
    }
  
    render(){
    	var d = this.props.data;
        return (
			<li key={this.props.key} className={"maker-mobile maker-"+d.slug} style={{backgroundImage: "url("+d.furniture.makerImg+")"}}>
				<a href={"#/makers/"+d.slug}>
					<i className={"maker-industry-icon icon-industry-"+d.furniture.icon}></i>
					<h3 className="maker-industry">{d.role}</h3>
					<h2>{d.name}</h2>
				</a>
			</li>
        )
    }
}

export class MakersComponent extends React.Component {

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
    	var makerItems = [];

    	_.forEach(this.state.makerData, function(item) {
    		makerItems.push(<MakersItemComponent key={item.id} data={item} />);
		});

        return (
            <main className="mobile-makers">
				<ul>
					{makerItems}
				</ul>
			</main>
        )
    }
}