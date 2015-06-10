/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';
import Router from 'react-router';

import { MainEvents } from '../main.jsx!';
import { IndexComponent, IndexEvents } from './index.jsx!';

export class HeaderComponent extends React.Component {
	
    constructor(){
        super();
        this.state = {};
    }

    render(){
        return (
			<header className="mobile-masthead">
				<div className="row">
					<div className="sponsor">
						<p>Brought<br />to you by</p>
						<img className="logo-ge" src="../images/logo.ge.svg" alt="GE" />
					</div>
					<a id="menuTrigger" className="menu-trigger"><i>Menu</i></a>
				</div>
				<ul className="meta-links">
					<li><a>About this content</a></li>
					<li><a><img className="logo-guardian" src="../images/logo.guardian.svg" alt="The Guardian" /></a></li>
				</ul>
			</header>
        )
    }
}