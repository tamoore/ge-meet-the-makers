/**
 * View for Makers Info
 *
 */
import { Application } from '../index';

import React from 'react';
import key from 'keymaster';
import { TimelineEvents, TimelineComponent, TimelineBackgroundComponent, TimelineListView } from './timeline.jsx!';
import { DataEvents, Data } from '../data/data';
import { MainEvents } from '../main.jsx!';

export const IndexEvents = {
    ACTIVE: "indexevents:active"
}
export class IndexComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            className: "timeline-circle",
            data: Data.result.length ? Data.result : this.attachDataHandler()
        }

        key('esc', ()=>{
            this.isActive = false;
            return window.location.hash = "#/timeline"
        })
    }

    attachDataHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleDataUpdate, this));
    }

    componentWillMount(){
        this.isActive = true;
    }

    componentDidMount(){
        TimelineBackgroundComponent.blur = true;
        Application.pipe.emit(TimelineEvents.GET_IMAGE);
        Application.pipe.on(MainEvents.FILTERMAKERS,(makerId)=>{ this.setState({ currentMaker: makerId }) });

        this.setState({
            "className": "timeline-circle off"
        })
        setTimeout(()=>{
            this.setState({
                "className": "timeline-circle animate"
            })

            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },500);
        setTimeout(()=>{
            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },1500);
    }

    componentWillUnmount(){
        this.isActive = false;
    }

    get isActive(){
        return IndexComponent.active;
    }

    set isActive(value){
        IndexComponent.active = value;
        Application.pipe.emit(IndexEvents.ACTIVE, this.isActive);
    }

    render(){
        var className = this.state.currentMaker ? "maker-"+this.state.currentMaker : "";
        return (
            <div>
                <section id="timelineCircleWrapper" className={this.state.className} data-filter="none">
                    <div className="preview-object preview-image" id="imagePreview"><div className="image-filter"></div><img src="images/thumb.png" alt="" /></div>
                    <div id="previewBlurb" className="preview-object preview-blurb">
                        <h3 id="previewType" className="preview-type"></h3>
                        <h2 id="previewHeading" className="preview-heading"></h2>
                        <i id="previewIcon" className="preview-icon"></i>
                    </div>
                    <div id="stateContainer" key='timelineParentWRapper' className={className}>
                        <div id="timelineInstructions" className="timeline-instructions">
                            <p>Hover over a dot to jump to content</p>
                        </div>
                    </div>

                    <div className="timeline-label timeline-label-12">midnight</div>
                    <div className="timeline-label timeline-label-18">6:00</div>
                    <div className="timeline-label timeline-label-0">noon</div>
                    <div className="timeline-label timeline-label-6">18:00</div>

                    <TimelineListView offset={0} circle={true} data={this.state.data} key='timelineListView'  />



                </section>
            </div>

        )
    }
}
IndexComponent.active = false;



