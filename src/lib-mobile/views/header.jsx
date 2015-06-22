/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class HeaderComponent extends React.Component {
	
    constructor(){
        super();
    }

    render(){
        return (
			<header className="mobile-masthead">
				<div className="row">
					<div className="sponsor">
						<p>Brought<br />to you by</p>
						<img className="logo-ge" src="images/logo.ge.svg" alt="GE" />
					</div>
					<a id="menuTrigger" className="menu-trigger"><i>Menu</i></a>
				</div>
				<ul className="meta-links">
					<li><a>About this content</a></li>
					<li><a><img className="logo-guardian" src="images/logo.guardian.svg" alt="The Guardian" /></a></li>
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
			<nav className="menu">
				<div className="navigation">
					<ul className="nav-content">
						<li><a href="#/" className={page == "" ? "selected" : ""}><span>Timeline</span></a></li>
						<li><a href="#/makers" className={page == "makers" ? "selected" : ""}><span>Meet The Makers</span></a></li>
						<li><a href="#/about" className={page == "about" ? "selected" : ""}><span>About</span></a></li>
					</ul>
					<ul className="nav-social">
						<li><a><svg viewBox="0 0 514 514"><path d="M375.7 123.5H138.3c-8.1 0-14.7 6.6-14.7 14.7v237.4c0 8.1 6.6 14.7 14.7 14.7h127.8V287.1h-34.8v-40.3h34.8v-29.7c0-34.5 21.1-53.2 51.8-53.2 14.7 0 27.4 1.1 31.1 1.6v36l-21.3 0c-16.7 0-20 7.9-20 19.6v25.7h39.9l-5.2 40.3h-34.7v103.4h68c8.1 0 14.7-6.6 14.7-14.7V138.3C390.4 130.1 383.8 123.5 375.7 123.5z"/><circle fill="none" stroke="#000000" stroke-width="16" stroke-miterlimit="10" cx="257" cy="257" r="249"/></svg><span className="assistive-text">Facebook</span></a></li>
						<li><a><svg viewBox="0 0 514 514"><defs><rect x="93.9" y="135.5" width="326.2" height="265.1"/></defs><clipPath><use overflow="visible"/></clipPath><path clip-path="url(#SVGID_2_)" d="M196.4 400.6c-37.8 0-73-11.1-102.6-30.1 5.2 0.6 10.6 0.9 16 0.9 31.4 0 60.2-10.7 83.1-28.7 -29.3-0.5-54-19.9-62.5-46.5 4.1 0.8 8.3 1.2 12.6 1.2 6.1 0 12-0.8 17.6-2.3 -30.6-6.1-53.7-33.2-53.7-65.6 0-0.3 0-0.6 0-0.8 9 5 19.3 8 30.3 8.4 -18-12-29.8-32.5-29.8-55.7 0-12.3 3.3-23.8 9.1-33.6 33 40.5 82.3 67.1 138 69.9 -1.1-4.9-1.7-10-1.7-15.3 0-37 30-66.9 66.9-66.9 19.3 0 36.6 8.1 48.9 21.1 15.2-3 29.6-8.6 42.5-16.2 -5 15.6-15.6 28.7-29.4 37 13.5-1.6 26.4-5.2 38.4-10.5 -9 13.4-20.3 25.2-33.4 34.6 0.1 2.9 0.2 5.8 0.2 8.7C386.9 298.6 319.5 400.6 196.4 400.6"/><circle fill="none" stroke="#000000" stroke-width="16" stroke-miterlimit="10" cx="257" cy="257" r="249"/></svg><span className="assistive-text">Twitter</span></a></li>
						<li><a><i>L</i><span className="assistive-text">LinkedIn</span></a></li>
					</ul>
				</div>
			</nav>
        )
    }
}