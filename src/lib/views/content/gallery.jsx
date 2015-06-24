import { Application } from '../../index';

import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { DataEvents, Data } from '../../data/data';

import React from 'react';
import marked from 'marked';

export class GalleryContentComponent extends React.Component {
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

        TimelineBackgroundComponent.blur = true;
        this.setState({
            "state": "off",
            "apply": "activate"
        })
        this.actionBlur();
        this.filterData();

    }
    componentWillUnmount(){
        this.setState({
            "state": "show",
            "apply": "deactivate"
        });
        Application.pipe.emit(TimelineEvents.PAUSECYCLE);
    }

    actionBlur(){
        setTimeout(()=>{
            this.setState({
                "state": "show"
            });
            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },10);
        setTimeout(()=>{
            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },1000);
    }

    filterData(){
        let data = this._data.content.filter((item)=>{
            return item.maker.toString() == this.props.params.maker;
        }).filter((item)=>{
            return item.guid == this.props.params.id;
        });

        if(data.length == 1) this.setState(data[0]);
        var standfirst =  data[0].furniture ? data[0].furniture.standfirst : null;
        this.setState({});
    }

    render(){
        return (
            <div className="gallery-content-component" data-content={this.state.apply} data-transition={this.state.state} key={this.context.router.name}>
                <CloseButtonComponent />
                <aside className="aside">
                    <a href="#" className="shareComponent facebookShare--button"><span className="assistive-text">Facebook</span></a>
                    <a href="#" className="shareComponent twitterShare--button"><span className="assistive-text">Twitter</span></a>
                </aside>
            </div>
        )
    }
}
GalleryContentComponent.contextTypes = {
    router: React.PropTypes.func
}