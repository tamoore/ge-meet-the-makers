/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';
import config from '../config';
import marked from 'marked';
import React from 'react';

export const PreviewEvents = {
    TOP: "preview-top",
    LEFT: "preview-left",
    RIGHT: "preview-right"
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
        var x, y, angle;
        if(PreviewComponent.position != PreviewEvents.TOP){
            angle = PreviewComponent.position == PreviewEvents.LEFT ? 320 : 35;
            x = this.props.clientX + 250 * Math.cos(angle);
            y = (this.props.clientY) + 250 * Math.sin(angle);

        }else{
            x  = this.props.clientX;
            y  = (this.props.clientY-100);
        }
        // Capture it on far LEFT
        if(x < 200){
            angle = 320;
            x = this.props.clientX + 250 * Math.cos(angle);
            PreviewComponent.position = PreviewEvents.LEFT;
            y = (this.props.clientY) + 250 * Math.sin(angle);
        }

        // Capture it on far RIGHT
        if(x > window.innerWidth - 300){
            angle = 35;
            x = this.props.clientX + 250 * Math.cos(angle);
            PreviewComponent.position = PreviewEvents.RIGHT;
            y = (this.props.clientY) + 250 * Math.sin(angle);
        }

        var oldPos = new String(PreviewComponent.position);
        this.stateTimer = setTimeout(()=>{
            this.setState({
                x: x,
                y: y,
                styles: {
                    left: x.toString()+"px",
                    top:  y.toString()+"px"
                },
                klass: oldPos
            });
        }, 1);
            
        PreviewComponent.position = this.positions[PreviewComponent.cycles];
        let line = React.findDOMNode(this.refs.line);
        let anim = React.findDOMNode(this.refs.anim);
        let length = '1000';
        anim.setAttribute("attributeName","stroke-dashoffset");
        anim.setAttribute('from','0');
        anim.setAttribute('to','0');
        anim.setAttribute('dur','0.25s');
        anim.setAttribute('begin','0');
        anim.setAttribute('fill','freeze');
        anim.setAttribute('keySplines','0 0.5 0.5 1');
        anim.setAttribute('calcMode','spline');

        line.setAttribute('stroke-dasharray',length+','+length);
        anim.setAttribute('values','-'+length+';0');
        setTimeout(()=>{
            this.setState({
                activeStateClass: 'active'
            });
            console.log(marked(this.props.data.body));
        }, 150);


        var index = 0;
        var textLength = this.props.data.title.length;

        var typingFunc = ()=>{
            if(index == textLength){
                clearTimeout(this.typingTimer);
                return;
            }
            if(index == 0){
                this.setState({
                    title: this.props.data.title.charAt(index)
                });
            }else{
                this.setState({
                    title: this.state.title + this.props.data.title.charAt(index)
                });
            }
            index++;
            this.typingTimer = setTimeout(()=>{
                typingFunc()
            }, 5);

        }
        typingFunc();

    }

    componentWillUnmount(){
        clearTimeout(this.stateTimer);
    }

    render(){

        var x1 = {};
        x1[PreviewEvents.TOP] = 0;
        x1[PreviewEvents.LEFT] = 230;
        x1[PreviewEvents.RIGHT] = 0;

        var x2 = {};
        x2[PreviewEvents.TOP] = 163;
        x2[PreviewEvents.LEFT] = 163;
        x2[PreviewEvents.RIGHT] = 390;

        var y1 = {};
        y1[PreviewEvents.TOP] = 0;
        y1[PreviewEvents.LEFT] = 0;
        y1[PreviewEvents.RIGHT] = 0;

        var y2 = {};
        y2[PreviewEvents.TOP] = 325;
        y2[PreviewEvents.LEFT] = 325;
        y2[PreviewEvents.RIGHT] = 335;

        let previewImage = {
            backgroundImage: `url( http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/${this.props.data.furniture ? this.props.data.furniture.mainImage : null}.jpg )`
        }

        return (
            <div rel="previewWrapper" style={this.state.styles}>
                <svg height="470" width="500" id="previewLine" className={this.state.klass}>
                    <g id="line" fill="none" stroke="white" strokeWidth="1" rotate="auto-reverse">
                        <line ref="line" x1={x1[this.state.klass]} y1={y1[this.state.klass]} x2={x2[this.state.klass]} y2={y2[this.state.klass]} className="previewLineEl">
                            <animate key={1} ref="anim"  />
                        </line>
                    </g>
                </svg>
                <div id="previewElement" style={previewImage} className={this.state.activeStateClass}>
                    <h2 data-type={this.props.data.type}>{this.state.title}</h2>
                </div>

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