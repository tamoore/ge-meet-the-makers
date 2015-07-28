/**
 * View for Makers Info
 *
 */
import { MobileApplication } from '../index';
import { StaticAssetsStore, StaticAssetsStoreEvents } from '../emitters/staticAssets';

import React from 'react';

export class PreloadComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            progress: 0
        }
        MobileApplication.pipe.on(StaticAssetsStoreEvents.PROGRESS, _.bind(this.handleProgress, this))
    }

    handleProgress(progress){
        this.setState({
            progress: progress
        })
    }

    render(){
        var style = {
            width: this.state.progress + "%"
        }
        return (
            <div id="progress" style={style}></div>
        )
    }
}



