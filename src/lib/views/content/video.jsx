/**
 * View for Makers Panel
 *
 */
import { Application } from '../../index';
import config from '../../config';

import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';

import React from 'react';

export class VideoContentComponent extends React.Component {
    constructor(){
        super();

    }
    componentWillMount(){

    }

    componentDidMount(){
    }

    componentWillUnmount(){

    }


    render(){
        return (
            <div className="video-content">
                <aside>
                    <h3>
                        Lorem ipsum dolor sit amet
                    </h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloribus ducimus excepturi ipsa iste minus modi mollitia, quas quia quibusdam quod reiciendis repudiandae rerum sunt tempora tempore vel veniam voluptatibus.
                    </p>
                </aside>
                <iframe src="https://player.vimeo.com/video/127295085" width="700" height="393.75" frameborder="1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        )
    }
}



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
        TimelineBackgroundComponent.blur = true;
        Application.pipe.emit(TimelineEvents.GET_IMAGE);
        console.log(this.context.router.getCurrentParams());

        this.setState({
            "state": "off",
            "apply": "activate"
        })
        setTimeout(()=>{
            this.setState({
                "state": "show"
            })
            Application.pipe.emit(TimelineEvents.GET_IMAGE);
        },10);

    }
    componentWillUnmount(){
        this.setState({
            "state": "show",
            "apply": "deactivate"
        })
    }



    render(){
        return (
            <div className="video-content-component" data-content={this.state.apply} data-transition={this.state.state} key={this.context.router.name}>
                <CloseButtonComponent />
                <VideoContentComponent />
            </div>
        )
    }
}
VideosContentComponent.contextTypes = {
    router: React.PropTypes.func
}



