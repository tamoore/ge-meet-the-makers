/**
 * About View
 */
import { Application } from '../index';

import React from 'react';

import { MainEvents } from '../main.jsx!';

/**
 * Component for About View
 */
export class AboutComponent extends React.Component {
   
    constructor(){
        super();
    }

    componentDidMount() {
		Application.pipe.emit(MainEvents.HIDEFILTER, true);
	}

    render(){
        return (
            <main className="mobile-about">
                <h1>About</h1>
            </main>
        )
    }
}
