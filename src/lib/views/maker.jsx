/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';
import { ClockView } from './clock.jsx!';

import React from 'react';


export class MakerComponent extends React.Component {
    constructor(){
        super();
    }
    render(){
        return (
            <section className="maker-info">
                <div className="maker-title"></div>
                <ClockView />
            </section>
        )
    }
}
