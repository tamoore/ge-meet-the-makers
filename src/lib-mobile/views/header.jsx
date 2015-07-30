/**
 * View for the header Filters on the timeline primarily
 *
 */
import { MobileApplication } from '../index';

import React from 'react';

import { SocialNavComponent } from './elements/social.jsx!';

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class HeaderComponent extends React.Component {
	
    constructor(){
        super();
        this.nav = null;

        this.closeNav = _.bind(this.closeNav, this);
        this.openNav = _.bind(this.openNav, this);
    }

    componentDidMount(){
    	this.nav = document.getElementById('slide-nav');
    	var el = document.getElementById('slide-nav');
		el.addEventListener("click", this.closeNav, false);
	}

    openNav(event){
    	this.nav.setAttribute("class", "menu menu-slide");
    	event.preventDefault();
    }

    closeNav(){
    	this.nav.setAttribute("class", "menu");
    }

    render(){
        return (
			<header className="mobile-masthead">
				<div className="row">
					<div className="sponsor">
						<p>Brought<br />to you by</p>
						<a href="http://gereports.com.au/" target="_blank" className="logo-ge"><span className="assistive-text">GE</span></a>
						<a id="menuTrigger" className="menu-trigger" onClick={this.openNav} href="#">
							<div><span className="assistive-text">Menu</span></div>
						</a>
					</div>
				</div>
				<ul className="meta-links">
					<li><a href="http://www.theguardian.com/innovation-never-sleeps/2015/jul/23/innovation-never-sleeps-about-this-content" target="_blank">About this content</a></li>
					<li><a href="http://www.theguardian.com/" target="_blank">
						<div className="logo-guardian"><span className="assistive-text">The Guardian</span></div>
					</a></li>
				</ul>
			</header>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class NavComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var page = this.props.page.split('/')[1];
        return (
			<nav className="menu" id="slide-nav">
				<div className="navigation">
					<div className="close-nav">
						<i className="arrow-forward"></i>
						<i className="arrow-forward"></i>
						<span className="assistive-text">Close Menu</span>
					</div>
					<ul className="nav-content">
						<li><a href="#/timeline" className={page == "timeline" || page == "content" ? "selected" : ""}><span>Timeline</span></a></li>
						<li><a href="#/makers" className={page == "makers" ? "selected" : ""}><span>Meet The Makers</span></a></li>
						<li><a href="#/credits" className={page == "credits" ? "selected" : ""}><span>Credits</span></a></li>
					</ul>
					<SocialNavComponent
						facebook="http://www.facebook.com/sharer/sharer.php?u=http://labs.theguardian.com/innovation-never-sleeps"
						twitter="http://twitter.com/share?text=Over 24 hours they change our seas, skies and solar system. Meet the makers&url=http://labs.theguardian.com/innovation-never-sleeps&hashtags=InnovationNeverSleeps, interactive"
						linkedin="https://www.linkedin.com/shareArticle?mini=true&url=http://labs.theguardian.com/innovation-never-sleeps&title=Innovation%20Never%20Sleeps&summary=Meet%20The%20Makers" twitterMsg="Lorem ipsum" />
				</div>
			</nav>
        )
    }
}