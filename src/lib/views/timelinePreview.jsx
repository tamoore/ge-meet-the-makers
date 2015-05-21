/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';
import config from '../config';

import React from 'react';

export const PreviewEvents = {
    TOP: "preview:top",
    LEFT: "preview:left",
    RIGHT: "preview:right"
}
export class PreviewComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            x: null,
            y: null,
            styles: null
        }
        this.positions = [
            PreviewEvents.TOP,
            PreviewEvents.LEFT,
            PreviewEvents.RIGHT
        ];

    }
    componentWillMount(){
        if(PreviewComponent.cycles == 0){
            PreviewComponent.cycles = PreviewComponent.cycles+1;
        }else{
            if(PreviewComponent.cycles == 2){
                PreviewComponent.cycles = 0;
            }else{
                PreviewComponent.cycles = PreviewComponent.cycles+1;
            }
        }

    }
    componentDidMount(){
        var x, y;
        if(PreviewComponent.position != PreviewEvents.TOP){
            let angle = PreviewComponent.position == PreviewEvents.LEFT ? 260 : 45;
            x = this.props.clientX + 450 * Math.cos(angle);
            y = (this.props.clientY-400) + 450 * Math.sin(angle);
        }else{
            x  = this.props.clientX;
            y  = (this.props.clientY-100);
        }

        this.setState({
            x: x,
            y: y,
            styles: {
                left: x.toString()+"px",
                top:  y.toString()+"px"
            }
        });
        console.log(PreviewComponent.cycles);
        PreviewComponent.position = this.positions[PreviewComponent.cycles];


    }
    componentWillUnmount(){

    }
    render(){
        return (
            <div style={this.state.styles} id="previewElement">

            </div>
        )
    }
}
PreviewComponent.propTypes = {
    clientX: React.PropTypes.number,
    clientY: React.PropTypes.number,
    data: React.PropTypes.object
};
PreviewComponent.position = PreviewEvents.TOP;
PreviewComponent.cycles = 0;