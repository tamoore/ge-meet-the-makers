/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';
import config from '../config';
import { ClockView } from './clock.jsx!';

import React from 'react';

export class MakerComponent extends React.Component {
    constructor(){
        super();
    }
    render(){
        return (
            <section className="maker-info">
                <div className="maker-title">
                    <strong>Navigator</strong>
                    <em className="maker-name">Mark Wilson</em>
                </div>
                <ClockView />
                <div className="maker-location">Perth, Western Australia</div>
            </section>
        )
    }
}
