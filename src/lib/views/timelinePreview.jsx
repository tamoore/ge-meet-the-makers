/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';
import marked from 'marked';
import React from 'react';
import { MainEvents } from '../main.jsx!';
import { TimelineEvents } from './timeline.jsx!';
import { StaticAssetsStore } from '../emitters/staticAssets';
import { DataEvents, Data } from '../data/data';

export const PreviewEvents = {
    TOP: "preview-top",
    LEFT: "preview-left",
    RIGHT: "preview-right"
}

export class PreviewIconComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            className: "PreviewIconComponent"
        }
    }
    componentDidMount(){
        this.setState({
            className: this.state.className + " maker-" + this.props.maker
        });
    }

    render(){
        return (
            <div className={this.state.className} ></div>
        )
    }
}

export class PreviewImageWrapper extends React.Component {
    constructor(){
        super();
    }
    render(){
        //var reader = new FileReader();
        //console.log(StaticAssetsStore.preload.getLoadedItems());
        return (
            <div className="timelinePreview-image--wrapper">
                <img src={this.props.previewImage} className="timelinePreview-image" />
            </div>
        )
    }
}

export class PreviewComponent extends React.Component {
    constructor(){
        super();
        this._data = Data.result ? Data.result.makers : this.attachDataEventHandler();

        this.state = {
            x: null,
            y: null,
            styles: null,
            maker: ""
        }
        this.positions = [
            PreviewEvents.TOP,
            PreviewEvents.LEFT,
            PreviewEvents.RIGHT
        ];

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

    handleData(data) {
        this.data = data;
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
        var maker = this.props.pullquote ? "pullquote":null;

        this.stateTimer = setTimeout(()=>{
            this.setState({
                x: x,
                y: y,
                styles: {
                    left: x.toString()+"px",
                    top:  y.toString()+"px"
                },
                klass: oldPos,
                maker: maker

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
        }, 150);


        var index = 0;
        var textLength = this.props.data.title.length;

        this.setState({
            title: this.props.pullquote ? this.props.data.pq : this.props.data.title
        });


        if(!this.props.pullquote){
            Application.pipe.emit(MainEvents.MAKERTITLE, this.props.data.maker);
        }

        this.setState({
            makerTitle: this._data[this.props.data.maker]? this._data[this.props.data.maker].role :null,
            makerName: this._data[this.props.data.maker]?   this._data[this.props.data.maker].name :null,
            makerLocation: this._data[this.props.data.maker]? this._data[this.props.data.maker].location :null
        });


    }

    componentWillUnmount(){
        clearTimeout(this.stateTimer);
        Application.pipe.emit(MainEvents.MAKERTITLE, 0);
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
        var pImage = null;
        var pClass = null;
        let previewImage = `${Application.assetLocation}${this.props.data.furniture ? this.props.data.furniture.mainImage : null}_small.png`
        var type = null;
        if(!this.props.pullquote){
            pImage = <PreviewImageWrapper previewImage={previewImage} />

        }else{
            pClass = "pullQuote";
        }
        if(this.props.data.type == "gallery"){
            if(this.props.data.images.length > 1){
                type = "gallery";
            }else{
                type = "image";
            }
        }else{
            type = this.props.data.type;
        }

        if(this.props.data.type == "factoid"){
            type = "infographic";
        }


        return (


            <div rel="previewWrapper" style={this.state.styles} className={pClass} data-hour={this.props.data.metadata.timeline.hour}>
                <svg height="470" width="500" id="previewLine" className={this.state.klass}>
                    <g id="line" fill="none" stroke="white" strokeWidth="1" rotate="auto-reverse">
                        <line ref="line" x1={x1[this.state.klass]} y1={y1[this.state.klass]} x2={x2[this.state.klass]} y2={y2[this.state.klass]} className="previewLineEl">
                            <animate key={1} ref="anim"  />
                        </line>
                    </g>
                </svg>
                <div id="previewElement" className={this.state.activeStateClass}>
                    <PreviewIconComponent maker={this.state.maker ? this.state.maker : this.props.data.maker} />
                    {pImage}
                    <p><strong>{this.state.makerTitle}</strong> {this.state.makerName}</p>
                    <h2 data-type={type}>{this.state.title}</h2>
                    <p className="pullquoteCredit">{this.state.makerName} <br/> <strong>{this.state.makerTitle}</strong> </p>
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