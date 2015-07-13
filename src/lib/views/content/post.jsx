import { Application } from '../../index';
import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { DataEvents, Data } from '../../data/data';
import { MainEvents } from '../../main.jsx!';
import  GeminiScrollbar from 'react-gemini-scrollbar';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

import key from 'keymaster';
import React from 'react';
import marked from 'marked';

export class SupportingImage extends React.Component {
    constructor(){
        super();
        this.state = {
            host: Application.assetLocation
        }
    }
    render(){

        let img = this.props.data[this.props.type] ? this.props.data[this.props.type][this.props.index == 0 ? 0 : 1] : null;
        if(!img) return ( null );
        let src = this.state.host + img.src + '_small.jpg';
        let caption = img.imageCaption;
        let credit = img.imageCredit;
        return (
            <figure>
                <img src={src}  />
                <figcaption>{caption}</figcaption>
                <span className="figureCredit">{credit}</span>
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
                <blockquote>{this.props.data.pq}</blockquote>
                <span className="figureCredit">{credit}</span>
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
                <blockquote>{this.props.data.funFact}</blockquote>
                <span className="figureCredit">{credit}</span>
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
        if(this.props.type == "images"){
            element = <SupportingImage type="images" index={this.props.index} data={this.props.data} />
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
                'images',
                'pq',
                'funFact',
                'images'
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

    componentDidMount(){
        Application.pipe.emit(TimelineEvents.PAUSECYCLE);
        TimelineBackgroundComponent.blur = true;
        let data;

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

        if(!this.props.params.makerName){
            data = this._data.content.filter((item)=>{
                return item.maker.toString() == this.props.params.maker;
            }).filter((item)=>{
                return item.guid == this.props.params.id;
            });
        }else{
            Application.pipe.emit(MainEvents.SHOWMAKERBIO);
            _.forIn(this._data.makers, (value,key)=>{
                if(value.slug == this.props.params.makerName){
                    data = [value];
                }
            })
        }



        if(data.length == 1) this.setState(data[0]);
        var standfirst =  data[0].furniture ? data[0].furniture.standfirst : null;
        this.setState({
            "standfirst": standfirst,
            "data": data[0],
            "body": data[0].body,
            "title": data[0].title,
            "image": `http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/${data[0].furniture ? data[0].furniture.mainImage : null}.jpg`,
            "imageCaption" : data[0].furniture ? data[0].furniture.mainImageCaption : null
        });
        Application.pipe.emit(MainEvents.MAKERTITLE, data[0].maker);

        if (ExecutionEnvironment.canUseDOM) {
            let el = document.querySelector('.gm-scroll-view');
            el.addEventListener('scroll', this.handleScroll);

            // Set up for triggers to get hit
            setTimeout(()=>{
                let triggers = []
                let increment = el.scrollHeight / 5;
                for(var i = 0; i<4;i++){
                    triggers.push(Math.floor(increment*i));
                }
                triggers.push(el.scrollHeight);
                this.setState({
                    scrollHeight: el.scrollHeight,
                    triggers: triggers
                });
                el.dispatchEvent(new Event('scroll'));
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
        for(var i = 0; i<5;i++){
            var next;
            if(direction == 'up'){
                next = i+1 < this.state.triggers.length ? i+1 : null;
            }else{
                if(i < this.state.triggers.length-1){
                    next = i-1 >= -1 ? i+1 : null;
                }

            }
            if(next != null){
                if(_.inRange(event.target.scrollTop, this.state.triggers[i], this.state.triggers[next])){
                    index = i;
                }
            }
        }
        this.setState({
            supportingType: this.state.supportingMap[index],
            supportingIndex: index
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
        return (
        <div className="post-content-component" data-content={this.state.apply} data-transition={this.state.state} key={this.context.router.name}>
            <CloseButtonComponent />
            <aside className="aside">
                <SupportingComponent type={this.state.supportingType} index={this.state.supportingIndex} data={this.state.data} />
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