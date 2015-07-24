/**
 * About View
 */
import { Application } from '../index';

import React from 'react';

import { MainEvents } from '../main.jsx!';

/**
 * Component for About View
 */
export class NotFoundComponent extends React.Component {
   
    constructor(){
        super();
    }

    componentDidMount() {
		Application.pipe.emit(MainEvents.HIDEFILTER, true);
	}

    render(){
        return (
            <main className="mobile-about">
            	<div className="texture-overlay"></div>
            	<div className="content-container">
					<article className="type-post">
						<h1 className="title bordered">Oops!</h1>
						<p>Sorry, that page doesn't exist.</p>
						<p><a href="#/timeline"><u>Back to the Timeline.</u></a></p>
					</article>
				</div>
			</main>
        )
    }
}
