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
                        <li><a>About this content</a></li>
                        <li><a id="footer-audio"><span className="assistive-text">Audio</span></a></li>
                        <li><a id="footer-facebook"> <span className="assistive-text">Facebook</span> </a></li>
                        <li><a id="footer-twitter">  <span className="assistive-text">Twitter</span>  </a></li>
                        <li><a id="footer-linkedin"> <span className="assistive-text">LinkedIn</span> </a></li>
                    </ul>
                </nav>
            </footer>
        )
    }
}