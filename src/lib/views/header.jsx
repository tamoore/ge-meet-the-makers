/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

import React from 'react';
import Router from 'react-router';

import { MainEvents } from '../main.jsx!';
import { TimelineEvents } from './timeline.jsx!';
import { IndexComponent, IndexEvents } from './index.jsx!';


let RouterLink = Router.Link;


export class HeaderComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            index: false,
            hide: false,
            makerId: null,
            styles: {
                opacity: 0
            },
            routesToIgnore: [
                'content', 'index','maker', 'credits'
            ]
        };
        this.showMakers = _.bind(this.showMakers, this);
        this.handleClick = _.bind(this.handleClick, this);
        this.handleHover = this.handleHover.bind(this);
        this.handleMastHeadClick = this.handleMastHeadClick.bind(this);
        this.handleOtherHover = this.handleOtherHover.bind(this);

        Application.pipe.on(IndexEvents.ACTIVE, _.bind(this.handleIndexActive, this));
        Application.pipe.on(TimelineEvents.ADDPREVIEW, ()=>{
            this.setState({
                styles: {
                    opacity: 0.2
                }
            })
        });
        Application.pipe.on(TimelineEvents.REMOVEPREVIEW, ()=>{
            this.setState({
                styles: {
                    opacity: 1
                }
            })
        });
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                styles: {
                    opacity: 1
                }
            })
        },MainEvents.timeLinetimeout);
    }

    handleIndexActive(value){
        this.setState({
            index: value
        });
    }

    showMakers(){
        Application.pipe.emit(MainEvents.SHOWMAKERS);
    }

    handleClick(event){
        let makerId = event.target.getAttribute("rel");
        this.state.makerId == makerId ? makerId = null : false;
        this.setState({
            makerId: makerId
        });
        Application.pipe.emit(MainEvents.FILTERMAKERS, makerId);
        Application.currentMaker = makerId ? makerId : 0;
        event.stopPropagation();
    }

    handleMastHeadClick(event){
        Application.pipe.emit(MainEvents.SHOWMAKERS);
    }

    handleHover(){
        //if(!this.hover){
        //    document.querySelector('.meet-the-makers-wrapper').setAttribute("data-hover", "yes");
        //    this.hover = true;
        //}else{
        //    document.querySelector('.meet-the-makers-wrapper').setAttribute("data-hover", "no");
        //    this.hover = false;
        //}

    }

    handleOtherHover(event){
        event.stopPropagation();
        document.querySelector('.meet-the-makers-wrapper').setAttribute("data-hover", "no");
        this.hover = false;
    }

    render(){
        var indexLocation = this.state.index ? "timeline" : "index";
        var indexLabel = this.state.index ? "close" : "index";
        let routeToCheck = this.props.currentRoute.split("/")[1];
        var hide = _.includes(this.state.routesToIgnore, routeToCheck)  ? "hidden" : "shown";


        return (
            <header className="masthead" onMouseOver={this.handleHover} onMouseOut={this.handleHover} onClick={this.handleMastHeadClick} data-active-maker={this.state.makerId} data-hide={hide} style={this.state.styles}>
                    <h1 onClick={this.showMakers} onMouseOver={this.handleOtherHover} onMouseOut={this.handleOtherHover}>
                        Meet The<br /> Makers
                    </h1>
                    <nav className="filter" >
                        <ol onMouseOver={this.handleOtherHover} onMouseOut={this.handleOtherHover}>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--space" rel="1">
                                    <span className="assistive-text">Space</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--industry" rel="2">
                                    <span className="assistive-text">Industry</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--fuel" rel="3">
                                    <span className="assistive-text">Fuel</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={this.handleClick} className="filter-button filter-button--energy" rel="4" >
                                    <span className="assistive-text">Energy</span>
                                </button>
                            </li>
                            <li onMouseOver={this.handleOtherHover}>
                                <button onClick={this.handleClick} className="filter-button filter-button--transport" rel="5" >
                                    <span className="assistive-text">Transportation</span>
                                </button>
                            </li>

                        </ol>
                    </nav>
                    <RouterLink to={indexLocation} className="btn-index" onClick={this.handleClick} >
                        {indexLabel}
                    </RouterLink>
                </header>
        )
    }
}



