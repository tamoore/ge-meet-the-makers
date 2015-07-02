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
            <main className="mobile-404">
                <h1>Not Found</h1>
            </main>
        )
    }
}
