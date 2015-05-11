/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';
import config from '../config';

import React from 'react';
import Router from 'react-router';
let RouterLink = Router.Link;


export class HeaderComponent extends React.Component {
    constructor(){
        super();
    }
    render(){
        return (
            <header className="masthead">
                <h1>
                    <RouterLink to="timeline">
                        Meet The<br /> Makers
                    </RouterLink>
                </h1>
                    <nav className="filter">
                        <ol>
                            <li>
                                <button className="filter-button filter-button--space">
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
                    <RouterLink to="index" className="btn-index">
                        Index
                    </RouterLink>
                </header>
        )
    }
}



