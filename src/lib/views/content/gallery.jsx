import { Application } from '../../index';

import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { DataEvents, Data } from '../../data/data';
import { Preload, PreloadEvents, PreloadConst } from '../../emitters/staticAssets';

import React from 'react';
import marked from 'marked';

import easeljs from 'easeljs';
import tweenjs from 'tweenjs';
import key from 'keymaster';


export class GalleryContentComponent extends React.Component {
    constructor(){
        super();
        let ratioConst = 1.7777778;
        this.preload = new Preload();
        this._data = Data.result;
        this.currentIndex = 0;
        this.handleDotClick = _.bind(this.handleDotClick, this);
        this.state = {
            state: "off",
            imageCaption: "",
            canvasHeight: (window.innerHeight*.6),
            canvasWidth: (window.innerHeight*.6)*1.7777778,
            imagesRaw: [],
            currentIndex: this.currentIndex
        }
        window.addEventListener('resize', _.bind(this.handleWindowResize, this));
        key('esc', ()=>{
            this.isActive = false;
            return window.location.hash = "#/timeline"
        })
        key('right', ()=>{
            this.nextImage();
        });
        key('left', ()=>{
            this.prevImage();
        });

        this.assignEvents();
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

    assignEvents(){
        Application.pipe.on(PreloadEvents.COMPLETE, _.bind(this.handlePreloadComplete, this));
    }

    attachDataEventHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleData, this));
    }

    handleData(data){
        this.setState(data);
    }

    nextImage(){
        if(this.currentIndex+1 < this.totalLength){
            this.currentIndex = this.currentIndex+1
        }else{
            this.currentIndex = 0;
        }
        this.setState({
            currentIndex: this.currentIndex
        });
        this.addBitMapToStage(this.state.imagesRaw[this.currentIndex]);
    }

    prevImage(){
        if(this.currentIndex-1 > -1){
            this.currentIndex = this.currentIndex-1
        }else{
            this.currentIndex = this.totalLength-1;
        }
        this.setState({
            currentIndex: this.currentIndex
        });
        this.addBitMapToStage(this.state.imagesRaw[this.currentIndex]);
    }

    handleDotClick(event){
        var index = event.target.getAttribute('data-index');
        this.currentIndex = parseInt(index);
        this.setState({
            currentIndex: this.currentIndex
        });
        this.addBitMapToStage(this.state.imagesRaw[this.currentIndex]);
    }

    handlePreloadComplete(event){
        if(!this.images) return;
        let imagesArray = [];
        this.images.forEach((image)=>{
            imagesArray.push(this.preload.preload.getResult(image.src));
        })
        this.setState({
            imagesRaw: imagesArray
        });
        this.totalLength = imagesArray.length;
        this.addBitMapToStage(imagesArray[this.currentIndex]);


    }

    handleWindowResize(){
        this.setState({
            canvasHeight: (window.innerHeight*.6),
            canvasWidth: (window.innerHeight*.6)*1.7777778
        });
        this.stage.update();
    }


    /**
     * Handles control for images being added to stage and applies filters
     * @param image
     * @returns {boolean}
     */
    addBitMapToStage(image){
        if(!image)return
        var img = new createjs.Bitmap(image);
        img.alpha = 0;
        createjs.Tween.get(img).to({alpha:1}, 0);
        img.scaleX = this.state.canvasWidth / image.width;
        img.scaleY = this.state.canvasHeight / image.height;

        this.stageUpdate( img );

    }

    componentDidMount(){
        TimelineBackgroundComponent.blur = true;
        this.setState({
            "state": "off",
            "apply": "activate"
        })
        this.stage = new createjs.Stage(React.findDOMNode(this.refs.gallery));
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this.stage);

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
        this.load(data[0].images);
        this.setState({
            standfirst: standfirst
        });

    }

    stageUpdate(image){
        if(!this.stage) return;
        this.stage.addChild(image);
        this.stage.update();
        return false;
    }

    load(images){
        this.images = images;
        this.preload.loadAssets(images);
    }

    render(){
        var dots = [];
        this.state.imagesRaw.forEach((image, index)=>{
            var _clsName = (index == this.state.currentIndex ? 'active': null);
          dots.push(<a onClick={this.handleDotClick} key={index} className={_clsName} data-index={index}><span className="assistive-text">image {index}</span></a>)
        });
        var dotsStyles = {
            marginTop: this.state.canvasHeight+10 + "px",
            maxWidth: this.state.canvasWidth
        }
        return (
            <div className="gallery-content-component" data-content={this.state.apply} data-transition={this.state.state} key={this.context.router.name}>
                <CloseButtonComponent />
                <aside className="aside">
                    <h3>
                        {this.state.title}
                    </h3>
                    <p>{this.state.standfirst}</p>
                    <a href="#" className="shareComponent facebookShare--button"><span className="assistive-text">Facebook</span></a>
                    <a href="#" className="shareComponent twitterShare--button"><span className="assistive-text">Twitter</span></a>
                </aside>
                <canvas ref="gallery" id="photoGallery" width={this.state.canvasWidth} height={this.state.canvasHeight} className="gallery"></canvas>
                <div className="dotsContainer" style={dotsStyles}>{dots}</div>
            </div>
        )
    }
}
GalleryContentComponent.contextTypes = {
    router: React.PropTypes.func
}