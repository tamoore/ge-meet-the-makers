/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';
import Router from 'react-router';

import { MainEvents } from '../main.jsx!';
import { IndexComponent, IndexEvents } from './index.jsx!';


let RouterLink = Router.Link;


export class HeaderComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            index: false,
            hide: false,
            makerId: null
        };
        this.showMakers = _.bind(this.showMakers, this);
        this.handleClick = _.bind(this.handleClick, this);

        Application.pipe.on(IndexEvents.ACTIVE, _.bind(this.handleIndexActive, this));
    }

    handleIndexActive(value){
        this.setState({
            index: value
        });
    }

    showMakers(){
        Application.pipe.emit(MainEvents.SHOWMAKERS);
    }

    handleClick(event){
    	console.log(event);
    	console.log(event.target.getAttribute("rel"));
        let makerId = event.target.getAttribute("rel");
        this.state.makerId == makerId ? makerId = null : false;
        this.setState({
            makerId: makerId
        });
        Application.pipe.emit(MainEvents.FILTERMAKERS, makerId);
    }

    render(){
        var indexLocation = this.state.index ? "timeline" : "index";
        var indexLabel = this.state.index ? "close" : "index";
        var hide = this.props.currentRoute.split("/")[1] === "content" ? "hidden" : "shown";


        return (
            <header className="masthead" data-active-maker={this.state.makerId} data-hide={hide}>
                    <h1 onClick={this.showMakers}>
                        Meet The<br /> Makers
                    </h1>
                    <nav className="filter">
                        <ol>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--space" rel="1">
                                    <span className="assistive-text">Space</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--industry" rel="2">
                                    <span className="assistive-text">Industry</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--fuel" rel="3">
                                    <span className="assistive-text">Fuel</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--energy" rel="4">
                                    <span className="assistive-text">Energy</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--transport" rel="5">
                                    <span className="assistive-text">Transportation</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--medical" rel="6">
                                    <span className="assistive-text">Medical</span>
                                </button>
                            </li>
                        </ol>
                    </nav>
                    <RouterLink to={indexLocation} className="btn-index" onClick={this.handleClick}>
                        {indexLabel}
                    </RouterLink>
                </header>
        )
    }
}



