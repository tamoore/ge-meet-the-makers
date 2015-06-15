/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';

export class FilterButtonComponent extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    render(){
        return (
			<button id="filterTrigger" className="filter-trigger">
			</button>
        )
    }
}