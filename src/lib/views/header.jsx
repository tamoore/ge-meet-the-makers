/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';
import config from '../config';

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
            hide: false
        };
        this.showMakers = _.bind(this.showMakers, this);


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

    render(){
        var indexLocation = this.state.index ? "timeline" : "index";
        var indexLabel = this.state.index ? "close" : "index";
        var hide = this.props.currentRoute.split("/")[1] === "content" ? "hidden" : "shown";


        return (
            <header className="masthead" data-hide={hide}>
                    <h1 onClick={this.showMakers}>
                        Meet The<br /> Makers
                    </h1>
                    <nav className="filter">
                        <ol>
                            <li>
                                <button className="filter-button filter-button--space" rel="1">
                                    <span className="assistive-text">Space</span>
                                </button>
                            </li>
                            <li>
                                <button className="filter-button filter-button--industry">
                                    <span className="assistive-text">Industry</span>
                                </button>
                            </li>
                            <li>
                                <button className="filter-button filter-button--fuel">
                                    <span className="assistive-text">Fuel</span>
                                </button>
                            </li>
                            <li>
                                <button className="filter-button filter-button--energy">
                                    <span className="assistive-text">Energy</span>
                                </button>
                            </li>
                            <li>
                                <button className="filter-button filter-button--transport">
                                    <span className="assistive-text">Transportation</span>
                                </button>
                            </li>
                            <li>
                                <button className="filter-button filter-button--medical">
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



