/**
 * View for Makers Panel
 *
 */
import { Application } from '../../index';

import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { MainEvents } from '../../main.jsx!';
import { DataEvents, Data } from '../../data/data';


import React from 'react';
import marked from 'marked';

export class VideoContentComponent extends React.Component {
    constructor(){
        super();
        this._data = Data.result;
        this.state = {
            yturl: "",
            standfirst: ""
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

    }

    componentDidMount(){
        this.processData();

    }

    processData(){
        let data = this._data.filter((item)=>{
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
            "body": marked(data[0].body)
        });

        this.qTypeing(data[0].title, "title");
        this.qTypeing(marked(data[0].body), "body");
        this.doTyping();

    }


    qTypeing(text, label){
        this.typing.push({
           "value": text,
           "label": label
        });
        var o = {};
        o[label] = "";
        this.setState(o);
    }

    doTyping(){
        var index = 0;
        var textLength = this.typing[this.typingIndex].value.length;

        var typingFunc = ()=>{
            if(index == textLength){
                cancelAnimationFrame(this.request);
                this.typingIndex = this.typingIndex+1;
                if(this.typingIndex < this.typing.length){
                    this.doTyping();
                }
                return;
            }
            if(index == 0){
                var o = {};
                o[this.typing[this.typingIndex].label] = this.typing[this.typingIndex].value.charAt(index);
                this.setState(o);
            }else{
                var o = {};
                o[this.typing[this.typingIndex].label] = this.state[this.typing[this.typingIndex].label] + this.typing[this.typingIndex].value.charAt(index);
                this.setState(o);
            }
            index++;
            this.request = requestAnimationFrame(_.bind(typingFunc, this));

        }
        typingFunc();
    }

    componentWillUnmount(){
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
                <aside>
                    <h3>
                        {this.state.title}
                    </h3>
                    <div dangerouslySetInnerHTML={{__html: this.state.body}} />
                </aside>
                <iframe width="560" height="315" src={this.state.yturl} frameborder="0" allowfullscreen></iframe>
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



