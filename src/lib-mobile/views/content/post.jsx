import { Application } from '../../index';

import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { DataEvents, Data } from '../../data/data';

import React from 'react';
import marked from 'marked';

export class PostsContentComponent extends React.Component {
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
        },1000);
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

            </div>
        )
    }
}
PostsContentComponent.contextTypes = {
    router: React.PropTypes.func
}