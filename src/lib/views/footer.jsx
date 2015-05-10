/**
 * View for the footer
 */
import { Application } from '../index';
import config from '../config';

import React from 'react';

export class FooterComponent extends React.Component {
    constructor(){
        super();
    }

    render(){
        return (
            <footer className="base">
                <div className="sponsor">
                    <p>Brought to you by</p>
                    <img className="logo-ge" src="images/logo.ge.svg" alt="GE" />
                    <p className="tagline">Innovation Never Sleeps <span>Meet The Makers</span></p>
                </div>
                <img className="logo-guardian" src="images/logo.guardian.svg" alt="The Guardian" />
                <nav className="controls">
                    <ul>
                        <li><a>Audio</a></li>
                        <li><a>Credits</a></li>
                        <li><a>Social</a></li>
                        <li><a>About</a></li>
                    </ul>
                </nav>
            </footer>
        )
    }
}