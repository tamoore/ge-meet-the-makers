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
        window.addEventListener('resize', _.bind(this.handleWindowResize, this));
    }

    get data(){
        return this._data;
    }
    set data(obj){
        this._data = obj;
        if(!this._data) this.attachDataEventHandler();
    }

    componentWillMount(){
        key('esc', ()=>{
            this.isActive = false;
            return window.location.hash = "#/timeline"
        })

    }

    handleWindowResize() {
        this.setState({
            canvasHeight: (window.innerHeight * .6),
            canvasWidth: (window.innerHeight * .6) * 1.7777778
        });
    }

    componentDidMount(){
        this.processData();

    }

    processData(){
        let data = this._data.content.filter((item)=>{
            return item.maker.toString() == this.props.params.maker;
        }).filter((item)=>{
            return item.guid == this.props.params.id;
        });
        if(data.length == 1) this.setState(data[0]);
        var ytembed = "https://www.youtube.com/embed/"+data[0].ytid+"?autoplay=1";
        var standfirst =  data[0].furniture ? data[0].furniture.standfirst : null;
        this.setState({
            "yturl" : ytembed,
            "standfirst": standfirst,
            "title": data[0].title
        });
        Application.pipe.emit(MainEvents.MAKERTITLE, data[0].maker);

    }

    componentWillUnmount(){
        Application.pipe.emit(MainEvents.MAKERTITLE, 0);
    }

    handleData(data){
        this.setState(data);


    }

    attachDataEventHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleData, this));
    }

    render(){
        return (
            <div className="video-content">
                <aside className="aside">
                    <h3>
                        {this.state.title}
                    </h3>
                    <div>
                        <p>{this.state.standfirst}</p>
                    </div>
                    <a href="#" className="shareComponent facebookShare--button"><span className="assistive-text">Facebook</span></a>
                    <a href="#" className="shareComponent twitterShare--button"><span className="assistive-text">Twitter</span></a>
                </aside>
                <iframe width={this.state.canvasWidth} height={this.state.canvasHeight} src={this.state.yturl} frameborder="0" allowfullscreen></iframe>
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
            <div className="video-content-component" data-content={this.state.apply} data-transition={this.state.state} key={this.context.router.name}>
                <CloseButtonComponent />
                <VideoContentComponent params={this.context.router.getCurrentParams()} />
            </div>
        )
    }
}
VideosContentComponent.contextTypes = {
    router: React.PropTypes.func
}



