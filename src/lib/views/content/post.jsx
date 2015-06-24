import { Application } from '../../index';

import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { DataEvents, Data } from '../../data/data';
import  GeminiScrollbar from 'react-gemini-scrollbar';

import React from 'react';
import marked from 'marked';

export class PostsContentComponent extends React.Component {
    constructor(){
        super();
        this._data = Data.result;
        this.state = {
            state: "off",
            imageCaption: ""
        }
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

    attachDataEventHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleData, this));
    }

    handleData(data){
        this.setState(data);
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
        },1000);

        let data = this._data.content.filter((item)=>{
            return item.maker.toString() == this.props.params.maker;
        }).filter((item)=>{
            return item.guid == this.props.params.id;
        });

        if(data.length == 1) this.setState(data[0]);
        var standfirst =  data[0].furniture ? data[0].furniture.standfirst : null;
        this.setState({
            "standfirst": standfirst,
            "body": marked(data[0].body),
            "title": data[0].title,
            "image": `http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/${data[0].furniture ? data[0].furniture.mainImage : null}.jpg`,
            "imageCaption" : "test"
        });

    }
    componentWillUnmount(){
        this.setState({
            "state": "show",
            "apply": "deactivate"
        });
        Application.pipe.emit(TimelineEvents.PAUSECYCLE);
    }


    render(){
        return (
        <div className="post-content-component" data-content={this.state.apply} data-transition={this.state.state} key={this.context.router.name}>
            <CloseButtonComponent />
            <aside className="aside">
                <a href="#" className="shareComponent facebookShare--button"><span className="assistive-text">Facebook</span></a>
                <a href="#" className="shareComponent twitterShare--button"><span className="assistive-text">Twitter</span></a>
            </aside>
            <GeminiScrollbar className="article">
                <article className="content" >
                    <h1>{this.state.title}</h1>
                    <figure>
                        <img src={this.state.image} alt="Holder text" />
                            <figcaption>
                                <p>{this.state.imageCaption}</p>
                            </figcaption>
                    </figure>
                    <p><strong>{this.state.standfirst}</strong></p>
                    <div dangerouslySetInnerHTML={{__html: this.state.body}} >
                    </div>
                </article>
            </GeminiScrollbar>
        </div>
        )
    }
}
PostsContentComponent.contextTypes = {
    router: React.PropTypes.func
}