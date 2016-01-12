/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';
import { ClockView } from './clock.jsx!';
import { MainEvents } from '../main.jsx!';
import { DataEvents, Data } from '../data/data';
import { TimelineEvents } from './timeline.jsx!';

import React from 'react';


export class MakerComponent extends React.Component {
    constructor(){
        super();
        this._data = Data.result ? Data.result.makers : this.attachDataEventHandler();
        this.state = {
            makerTitle: null,
            makerName: null,
            makerLocation: null,
            styles: {

            }
        }
        Application.pipe.on(TimelineEvents.ADDPREVIEW, ()=>{
            this.setState({
                styles: {
                    opacity: 0.2
                },
                specialStyles: {
                    opacity: 0
                }
            })
        });
        Application.pipe.on(TimelineEvents.REMOVEPREVIEW, ()=>{
            this.setState({
                styles: {
                    opacity: 1
                },
                specialStyles: {
                    opacity: 1
                }
            })
        });
    }

    get data(){
        return this._data;
    }
    set data(obj){
        this._data = obj;
        if(!this._data) this.attachDataEventHandler();
    }

    handleData(data){
        this._data = data.makers;
    }

    attachDataEventHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleData, this));
    }

    componentDidMount(){
        Application.pipe.on(MainEvents.MAKERTITLE, _.bind(this.handleMakerTitle, this));
        var title = React.findDOMNode(this.refs.title);
        title.style.display = "inline-block";
    }

    handleMakerTitle(maker, fromContent){
        if(!fromContent){
            if((window.location.hash.split("/")[1] == "content") && (this.state.makerTitle != null)){
                return;
            }
            if((window.location.hash.split("/")[1] == "maker") && (this.state.makerTitle != null)){
                return;
            }
        }

        if(maker){
            this.setState({
                makerTitle: this._data[maker]? this._data[maker].role :null,
                makerName: this._data[maker]?   this._data[maker].name :null,
                makerLocation: this._data[maker]? this._data[maker].location :null
            });
        }else{
            this.setState({
                makerTitle: null,
                makerName: null,
                makerLocation: null
            });
        }

    }

    render(){
        return (
            <section className="maker-info" style={this.state.styles}>
                <div ref="title" style={this.state.specialStyles} className="maker-title"><strong>{this.state.makerTitle}</strong>  {this.state.makerName}</div>
                <ClockView />
                <div className="maker-location" style={this.state.specialStyles}>{this.state.makerLocation}</div>
            </section>
        )
    }
}
