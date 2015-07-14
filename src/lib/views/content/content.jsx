import { Application } from '../../index';
import { GalleryContentComponent } from './gallery.jsx!';
import { VideosContentComponent } from './video.jsx!';
import { PostsContentComponent } from './post.jsx!';
import { DataEvents, Data } from '../../data/data';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import React from 'react';

export class ContentHandler extends React.Component {
    constructor(){
        super();
        this._data = Data.result;
        this.state = {
            el: null
        }
    }
    get data(){
        return this._data;
    }
    set data(obj){
        this._data = obj;
        if(!this._data) this.attachDataEventHandler();
    }

    attachDataEventHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleData, this));
    }

    componentWillMount(){
        TimelineBackgroundComponent.blur = true;

        this.setState({
            "state": "off",
            "apply": "activate"
        });
        setTimeout(()=>{
            this.setState({
                "state": "show"
            });
            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },10);
        setTimeout(()=>{
                Application.pipe.emit(TimelineEvents.GET_IMAGE);
        }, 1000);
    }

    componentDidMount(){
        var makerId = Application.makers.indexOf(this.props.params.maker)+1;
        let data = this._data.content.filter((item)=>{
            return parseInt(item.maker) == makerId;
        }).filter((item)=>{
            return item.slug == this.props.params.id;
        });

        this.data = data[0];
        var el;
        switch(this.data.type){
            case "video":
                el = <VideosContentComponent data={this.data} />
                break;
            case "gallery":
                el = <GalleryContentComponent data={this.data} />
                break;
            case "post":
                el = <PostsContentComponent data={this.data} />
                break;
        }
        this.setState({
            el: el
        });
    }

    handleData(data){
        this.data = data;
    }

    render(){

        return (
            <div key={this.context.router.name} data-content={this.state.apply} data-transition={this.state.state}>
                {this.state.el}
            </div>
        )
    }
}
ContentHandler.contextTypes = {
    router: React.PropTypes.func
}