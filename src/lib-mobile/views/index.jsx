/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';

import React from 'react';

export class IndexComponent extends React.Component {
    
    constructor(){
        super();
    }
    
    render(){
        return (
            <section className="maker-index">
                <h1>Home</h1>
            </section>
        )
    }
}