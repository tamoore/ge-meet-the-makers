import { Application } from '../../index';
import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { DataEvents, Data } from '../../data/data';
import { MainEvents } from '../../main.jsx!';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

import key from 'keymaster';
import React from 'react';
import marked from 'marked';

import GeminiScrollbar from 'gemini-scrollbar';

export class ReactGeminiScrollbar extends React.Component {

    constructor() {
        super()
        this.scrollbar = null;
    }


    getDefaultProps() {
        return {
            autoshow: false
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            this.scrollbar = new GeminiScrollbar({
                element: React.findDOMNode(this.refs.scrollbar),
                autoshow: this.props.autoshow,
                createElements: false
            }).create();
        }, 1000);

    }

    componentDidUpdate() {
       // this.scrollbar.update();
    }

    componentWillUnmount() {
        this.scrollbar.destroy();
        this.scrollbar = null;
    }

    render() {
        var {className, children} = this.props,
            classes = '';

        if (className) {
            classes += ' ' + className;
        }

        return (
            <div className={classes} ref="scrollbar">
                <div className='gm-scrollbar -vertical'>
                    <div className='thumb'></div>
                </div>
                <div className='gm-scrollbar -horizontal'>
                    <div className='thumb'></div>
                </div>
                <div className='gm-scroll-view' ref='scroll-view'>
                    {children}
                </div>
            </div>
        );
    }
}


export class SupportingImage extends React.Component {
    constructor(){
        super();
        this.state = {
            host: Application.assetLocation
        }
    }
    render(){

        let img = this.props.data[this.props.type] ? this.props.data[this.props.type][this.props.imageIndex-1] : null;
        if(!img) return ( null );
        let src = this.state.host + img.src + '_small.jpg';
        let caption = img.imageCaption;
        let credit = img.imageCredit;
        return (
            <figure>
                <img src={src}  />
                <figcaption><span dangerouslySetInnerHTML={{ __html: caption }}></span></figcaption>
                <span className="figureCredit"><span dangerouslySetInnerHTML={{ __html: credit }}></span></span>
            </figure>
        )
    }
}

export class SupportingPullQuote extends React.Component {
    constructor(){
        super();
    }
    render(){
        if(!this.props.data) return ( null );
        let credit = this.props.data['pqCredit']
        return (
            <figure>
                <blockquote>
                    <span dangerouslySetInnerHTML={{ __html: this.props.data.pq }}></span>
                </blockquote>
                <span className="figureCredit"><span dangerouslySetInnerHTML={{ __html: credit }}></span></span>
            </figure>
        )
    }
}

export class SupportingFunFact extends React.Component {
    constructor(){
        super();
    }
    render(){
        if(!this.props.data) return ( null );
        let credit = this.props.data['funFactCredit']
        return (
            <figure className="funFact">
                <span>{this.props.data.funFactNumber}</span>
                <blockquote>
                    <span dangerouslySetInnerHTML={{ __html: this.props.data.funFact }}></span>
                </blockquote>
                <span className="figureCredit">
                    <span dangerouslySetInnerHTML={{ __html: credit }}></span>
                </span>
            </figure>
        )
    }
}


export class SupportingComponent extends React.Component {
    constructor(){
        super();
    }
    render(){
        var element = null;
        if(this.props.type.split("-")[0] == "images"){
            element = <SupportingImage type="images" index={this.props.index} data={this.props.data} imageIndex={parseInt(this.props.type.split("-")[1])} />
        }

        if(this.props.type == "pq"){
            element = <SupportingPullQuote index={this.props.index} data={this.props.data} />
        }

        if(this.props.type == "funFact"){
            element = <SupportingFunFact index={this.props.index} data={this.props.data} />
        }

        return (
            <div>
                {element}
            </div>

        )
    }

}
export class PostsContentComponent extends React.Component {
    constructor(){
        super();
        this._data = Data.result;
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            state: "off",
            imageCaption: "",
            triggersIndex: 0,
            supportingMap: [
            ],
            supportingType: 'images',
            supportingIndex: 0,
            data: {}

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
        key('esc', ()=>{
            this.isActive = false;
            return window.location.hash = "#/timeline"
        })

    }

    attachDataEventHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleData, this));
    }

    handleData(data){
        this.setState(data);
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    componentDidMount(){
        Application.pipe.emit(MainEvents.MAKERTITLE, this.props.maker);
        if (ExecutionEnvironment.canUseDOM) {
            let el = document.querySelector('.gm-scroll-view');
            el.addEventListener('scroll', this.handleScroll);

            // Set up for triggers to get hit
            setTimeout(()=>{
                var triggers = []
                var count = 0;
                var newArray = this.state.supportingMap.slice();
                if(this.props.data.pq){
                    count = count+1;
                    newArray.push("pq");
                }
                if(this.props.data.funFact){
                    count = count+1;
                    newArray.push("funFact");
                }
                if(this.props.data.images){
                    count = count + this.props.data.images.length;
                    for(var i=0;i<this.props.data.images.length;i++){
                        newArray.push("images-"+(i+1));
                    }
                }
                this.setState({
                    supportingMap: this.shuffleArray(newArray)
                });
                this.count = count;

                var increment = el.scrollHeight / (count+1);
                for(var j = 0; j<count;j++){
                    triggers.push(Math.floor(increment*j));
                }
                triggers.push(el.scrollHeight);
                this.setState({
                    scrollHeight: el.scrollHeight,
                    triggers: triggers
                });
                el.dispatchEvent(new CustomEvent('scroll'));
            },10);
        }

    }

    handleScroll(event){
        var direction;
        var index;


        if(this.state.lastScrollTop){
            direction = event.target.scrollTop > this.state.lastScrollTop ? 'up':'down';
        }else{
            direction = 'up';
        }
        this.setState({
            lastScrollTop: event.target.scrollTop
        });
        for(var i = 0; i<this.count;i++){
            var next;
            if(direction == 'up'){
                next = i+1 < this.state.triggers.length ? i+1 : null;
            }else{
                if(i < this.state.triggers.length-1){
                    next = i-1 >= -1 ? i+1 : null;
                }

            }
            if(next != null){
                console.info(this.state.triggers[i],this.state.triggers[next], event.target.scrollTop);
                if(_.inRange(event.target.scrollTop, this.state.triggers[i], this.state.triggers[next])){
                    index = i;
                    console.info(index);
                }
            }
        }




        this.setState({
            supportingType: this.state.supportingMap[index ? index : 0],
            supportingIndex: index ? index : 0,
        });
    }

    componentWillUnmount(){
        this.setState({
            "state": "show",
            "apply": "deactivate"
        });
        Application.pipe.emit(TimelineEvents.PAUSECYCLE);
        Application.pipe.emit(MainEvents.MAKERTITLE, 0);
        document.querySelector('.gm-scroll-view').removeEventListener('scroll', this.handleScroll);
    }


    render(){
        var image = `${Application.assetLocation}${this.props.data.furniture.mainImage}_medium.jpg`;
        var credit = this.props.data.furniture.mainImageCredit ? <span> Credit: <span dangerouslySetInnerHTML={{ __html: this.props.data.furniture.mainImageCredit }}></span> </span> : null;
        return (
            <div className="post-content-component">
                <CloseButtonComponent />
                <aside className="aside">
                    <SupportingComponent type={this.state.supportingType} index={this.state.supportingIndex} data={this.props.data} />
                    <a href="#" className="shareComponent facebookShare--button"><span className="assistive-text">Facebook</span></a>
                    <a href="#" className="shareComponent twitterShare--button"><span className="assistive-text">Twitter</span></a>
                </aside>
                <ReactGeminiScrollbar className="article">
                    <article className="content" >
                        <h1>{this.props.data.title}</h1>
                        <figure>
                            <img src={image} alt={this.props.data.furniture.mainImageCaption} aria-label={this.props.data.furniture.mainImageCaption} />
                                <figcaption>
                                    <p><span dangerouslySetInnerHTML={{ __html: this.props.data.furniture.mainImageCaption }}></span> {credit} </p>
                                </figcaption>
                        </figure>
                        <p><strong>{this.props.data.furniture.standfirst}</strong></p>
                        <div dangerouslySetInnerHTML={{__html: this.props.data.body}} >
                        </div>
                    </article>
                </ReactGeminiScrollbar>
            </div>
        )
    }
}
PostsContentComponent.contextTypes = {
    router: React.PropTypes.func
}