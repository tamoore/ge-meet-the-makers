/**
 * View for the footer
 */
import { Application } from '../index';
import { MainEvents } from '../main.jsx!';

import React from 'react';

export class FooterComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            styles: {
                "opacity": 0
            }
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                styles: {
                    opacity: 1
                }
            })
        }, MainEvents.footerTimeout || 0);
    }

    render(){
        return (
            <footer className="base" style={this.state.styles}>
                <div className="sponsor">
                    <p>Brought to you by</p>
                    <img className="logo-ge" src="images/logo.ge.svg" alt="GE" />
                    <p className="tagline">Innovation Never Sleeps <span>Meet The Makers</span></p>
                </div>
                <img className="logo-guardian" src="images/logo.guardian.svg" alt="The Guardian" />
                <a className="about-this-content" href="http://www.theguardian.com/innovation-never-sleeps/2015/jul/23/innovation-never-sleeps-about-this-content" target="_blank">About this content</a>
                <nav className="controls">
                    <ul>
                        <li><a href="#/credits">credits</a></li>
                        <li><a href="http://www.facebook.com/sharer/sharer.php?u=http://labs.theguardian.com/innovation-never-sleeps" id="footer-facebook"> <span className="assistive-text">Facebook</span> </a></li>
                        <li><a id="footer-twitter">  <span className="assistive-text">Twitter</span>  </a></li>
                        <li><a id="footer-linkedin"> <span className="assistive-text">LinkedIn</span> </a></li>
                    </ul>
                </nav>
            </footer>
        )
    }
}