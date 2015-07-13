/**
 * View for Makers Panel
 *
 */
import { Application } from '../index';

import React from 'react';
import { MainEvents } from '../main.jsx!';
import { DataEvents, Data } from '../data/data';
import key from 'keymaster';

export class MakerPanel extends React.Component {
    constructor(){
        super();
        this.handlePanelClick = this.handlePanelClick.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.state = {
            active: "off"
        }
    }
    componentDidMount(){

    }
    componentWillUnMount(){
    }

    handlePanelClick(event){
        let active = this.state.active == "off" ? "on" : "off";
        this.setState({
            active: active
        });
    }

    handleMouseOut(event){
        this.setState({
            active: "off"
        });
    }

    render(){
        var styles = {
            backgroundImage: `url(${this.props.backgroundImage})`
        };

        return (
            <section className="maker-panel" data-state={this.state.active} onClick={this.handlePanelClick} onMouseLeave={this.handleMouseOut}>
                <div className="maker-panel-background" style={styles}></div>
                <div className="maker-content">
                    <header>
                        <h3 className="maker-title">{this.props.title}</h3>
                        <h2 className="maker-name">{this.props.name}</h2>
                        <img src={this.props.icon} alt="Maker Industry Icon" className="maker-industry" />
                    </header>

                    <div className="maker-bio-excerpt">
                        <p>{this.props.excerpt}</p>
                        <p><a href={this.props.href}>Read More</a></p>
                    </div>
                </div>

            </section>
        )
    }
}

MakerPanel.propTypes = {
    id: React.PropTypes.number,
    backgroundImage: React.PropTypes.string,
    title: React.PropTypes.string,
    name: React.PropTypes.string,
    icon: React.PropTypes.string,
    excerpt: React.PropTypes.string,
    href: React.PropTypes.string
}


export class MeetTheMakersComponent extends React.Component {
    constructor(){
        super();
        let data = this._data = Data.result;

        this.state = {
            data: data,
            makers: []
        }

        this.hideMakers = _.bind(this.hideMakers, this);
        Application.pipe.on(MainEvents.SHOWMAKERS, _.bind(this.handleShowMakers, this));
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

    handleData(data){
        this.setState({
            data: data
        });
    }

    componentWillMount(){

    }

    componentDidMount(){
        if(this.data){
            this.makers = this.data.makers;
            this.generateMakers()
        }
        key('esc', ()=>{
            if(this.state.active == "active"){
                this.hideMakers()
            }

        })
    }

    generateMakers(){
        var makers = [];
        for(var i=0;i<5;i++){
            let maker = this.makers[i+1];
            let href = "#/maker/"+maker.slug
            makers.push(<MakerPanel id={i+1} backgroundImage={maker.makerImg}
                title={maker.role}
                name={maker.name}
                icon={maker.iconFile}
                excerpt={maker.furniture.standfirst}
                href={href}
                />)
        }
        this.setState({
            makers: makers
        });
    }

    componentWillUnmount(){

    }

    handleShowMakers(){
        setTimeout(()=>{
            this.setState({
                active: "active"
            })
        }, 1000)
    }

    hideMakers(){
        Application.pipe.emit(MainEvents.HIDEMAKERS);
        this.setState({
            active: ""
        })
    }

    render(){
        return (
            <div>
                <footer className="base" data-state={this.state.active}>
                    <h1 onClick={this.hideMakers}>
                        Timeline
                    </h1>
                    <img className="logo-guardian" src="images/logo.guardian.svg" alt="The Guardian" />
                    <nav className="controls">
                        <ul>
                            <li><a>About this content</a></li>
                            <li><a id="footer-audio"><span className="assistive-text">Audio</span></a></li>
                            <li><a id="footer-facebook"> <span className="assistive-text">Facebook</span> </a></li>
                            <li><a id="footer-twitter">  <span className="assistive-text">Twitter</span>  </a></li>
                            <li><a id="footer-linkedin"> <span className="assistive-text">LinkedIn</span> </a></li>
                        </ul>
                    </nav>
                </footer>
                <div id="makerPanels" className="makers meet-the-makers-component">
                    {this.state.makers}
                </div>
            </div>
        )
    }
}




