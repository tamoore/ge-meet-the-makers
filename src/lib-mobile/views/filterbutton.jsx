/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';

export class FilterButtonComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var maker = this.props.makerId;

        return (
			<button id="filterTrigger" className={maker ? "icon-"+maker+" filter-trigger" : "icon-filter filter-trigger"} data-maker={maker ? maker : ""}></button>
        )
    }
}