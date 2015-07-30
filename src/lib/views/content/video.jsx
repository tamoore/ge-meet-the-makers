/**
 * View for Makers Panel
 *
 */
import { Application } from '../../index';

import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { MainEvents } from '../../main.jsx!';

import { DataEvents, Data } from '../../data/data';

import key from 'keymaster';
import React from 'react';
import marked from 'marked';

export class VideoContentComponent extends React.Component {
    constructor(){
        super();
        this._data = Data.result;
        this.state = {
            yturl: "",
            standfirst: "",
            canvasHeight: (window.innerHeight*.6),
            canvasWidth: (window.innerHeight*.6)*1.7777778
        }
        this.typing = [];
        this.typingIndex = 0;

    }

    get data(){
        return this._data;
    }
    set data(obj){
        this._data = obj;
        if(!this._data) this.attachDataEventHandler();
    }

    componentWillMount(){
        window.addEventListener('resize', _.bind(this.handleWindowResize, this));
        key('esc', ()=>{
            this.isActive = false;
            return window.location.hash = "#/timeline"
        });
        Application.pipe.emit(MainEvents.MAKERTITLE, this.props.data.maker);

    }

    handleWindowResize() {
        this.setState({
            canvasHeight: (window.innerHeight * .6),
            canvasWidth: (window.innerHeight * .6) * 1.7777778
        });
    }


    componentWillUnmount(){
        window.removeEventListener('resize', _.bind(this.handleWindowResize, this));
        Application.pipe.emit(MainEvents.MAKERTITLE, 0);
    }

    handleData(data){
        this.setState(data);


    }

    attachDataEventHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleData, this));
    }

    render(){
        var ytembed = "https://www.youtube.com/embed/"+this.props.data.ytid+"?autoplay=1";

        return (
            <div className="video-content">
                <aside className="aside">
                    <h3>
                        {this.props.data.title}
                    </h3>
                    <div>
                        <p>{this.props.data.furniture.standfirst}</p>
                    </div>
                    <a href={this.props.data.facebookShare} className="shareComponent facebookShare--button"><span className="assistive-text">Facebook</span></a>
                    <a href={this.props.data.twitterShare} className="shareComponent twitterShare--button"><span className="assistive-text">Twitter</span></a>
                </aside>
                <iframe width={this.state.canvasWidth} height={this.state.canvasHeight} src={ytembed} frameborder="0" allowfullscreen></iframe>
            </div>
        )
    }
}

//

export class VideosContentComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            state: "off"
        }
    }

    componentWillMount(){
    }

    componentDidMount(){
        Application.pipe.emit(TimelineEvents.PAUSECYCLE);
        TimelineBackgroundComponent.blur = true;


        this.setState({
            "state": "off",
            "apply": "activate"
        })
        setTimeout(()=>{
            this.setState({
                "state": "show"
            });
            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },10);
        setTimeout(()=>{
            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },
            1000);
    }

    componentWillUnmount(){
        this.setState({
            "state": "show",
            "apply": "deactivate"
        });
    }


    render(){
        return (
            <div>
                <CloseButtonComponent />
                <div className="video-content-component">
                    <VideoContentComponent data={this.props.data} />
                </div>
            </div>

        )
    }
}
VideosContentComponent.contextTypes = {
    router: React.PropTypes.func
}



