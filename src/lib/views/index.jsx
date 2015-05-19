/**
 * View for Makers Info
 *
 */
import { Application } from '../index';
import config from '../config';

import React from 'react';
import key from 'keymaster';
import { TimelineEvents, TimelineComponent, TimelineBackgroundComponent } from './timeline.jsx!';

export const IndexEvents = {
    ACTIVE: "indexevents:active"
}
export class IndexComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            className: "timeline-circle"
        }
        key('esc', ()=>{
            this.isActive = false;
            return window.location.hash = "#/timeline"
        })
    }
    componentWillMount(){
        this.isActive = true;
    }

    componentDidMount(){
        TimelineBackgroundComponent.blur = true;
        Application.pipe.emit(TimelineEvents.GET_IMAGE);
        this.setState({
            "className": "timeline-circle off"
        })
        setTimeout(()=>{
            this.setState({
                "className": "timeline-circle animate"
            })

            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },500);
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
        return (
            <div>
                <section id="timelineCircleWrapper" className={this.state.className} data-filter="none">
                    <div className="preview-object preview-image" id="imagePreview"><div className="image-filter"></div><img src="images/thumb.png" alt="" /></div>
                    <div id="previewBlurb" className="preview-object preview-blurb">
                        <h3 id="previewType" className="preview-type"></h3>
                        <h2 id="previewHeading" className="preview-heading"></h2>
                        <i id="previewIcon" className="preview-icon"></i>
                    </div>

                    <div id="timelineInstructions" className="timeline-instructions">
                        <p>Hover over a dot to jump to content</p>
                    </div>

                    <div className="timeline-label timeline-label-12">noon</div>
                    <div className="timeline-label timeline-label-18">18:00</div>
                    <div className="timeline-label timeline-label-0">midnight</div>
                    <div className="timeline-label timeline-label-6">06:00</div>

                    <ol id="timelineList" className="timeline-list">
                        <li className="timeline-marker" data-time="12:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a data-industry="transport" data-title="A transport industry video" data-type="video" data-preview="images/thumb2.jpg"><span className="assistive-text">Content title</span></a></li>
                                    <li><a data-industry="space" data-title="A spaceman slideshow" data-type="images" data-preview="images/thumb.png"><span className="assistive-text">Content title</span></a></li>
                                    <li><a data-industry="energy" data-title="An energy video" data-type="video" data-preview="images/thumb.png"><span className="assistive-text">Content title</span></a></li>
                                    <li><a data-industry="medical" data-title="A healthcare video" data-type="video" data-preview="images/thumb.png"><span className="assistive-text">Content title</span></a></li>
                                    <li><a data-industry="fuel" data-title="A video about petrol" data-type="video" data-preview="images/thumb.png"><span className="assistive-text">Content title</span></a></li>
                                    <li><a data-industry="industry" data-title="A manufacturing video" data-type="video" data-preview="images/thumb.png"><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="13:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="14:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="15:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="16:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="17:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="18:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="19:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="20:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="21:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="22:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="23:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="00:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="01:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="02:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="03:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="04:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="05:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="06:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="07:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="08:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="09:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="10:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="timeline-marker" data-time="11:00">
                            <div className="marker-data">
                                <ul>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                    <li><a><span className="assistive-text">Content title</span></a></li>
                                </ul>
                            </div>
                        </li>
                    </ol>
                </section>
            </div>

        )
    }
}
IndexComponent.active = false;



