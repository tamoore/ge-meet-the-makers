/**
 * View for the header Filters on the timeline primarily
 *
 */
import { MobileApplication } from '../index';

import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { MainEvents } from '../main.jsx!';

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class FilterButtonComponent extends React.Component {

    constructor(){
        super();
        this.state = {
        	hidden: false,
        	toggle: MainEvents.TOGGLEFILTER,
        	viewportTop: 0
        }

        this.filterVisibility = _.bind(this.filterVisibility, this);
        this.toggleFilter = _.bind(this.toggleFilter, this);
    }

    componentDidMount() {
    	MobileApplication.pipe.on(MainEvents.HIDEFILTER,(state)=>{
        	this.setState({ 
        		hidden: state
        	});
        });

        MobileApplication.pipe.on(MainEvents.TOGGLEFILTER,(state)=>{
        	this.setState({ 
        		toggle: state
        	});
        });

        window.addEventListener('scroll', this.filterVisibility, false);
		window.addEventListener('resize', this.filterVisibility, false);
		this.filterVisibility();
    }

    componentWillUnmount() {
		window.removeEventListener('scroll', this.filterVisibility, false);
		window.removeEventListener('resize', this.filterVisibility, false);
	}

	filterVisibility(){
		this.setState({
			viewportTop: window.pageYOffset
		});
	}

	toggleFilter(){
		MobileApplication.pipe.emit(MainEvents.TOGGLEFILTER, !this.state.toggle);
	}

    render(){
    	var { maker } = this.props;
    	var { viewportTop, toggle } = this.state;

    	var className = maker ? "icon-industry icon-"+maker.icon : "icon-industry icon-filter";
    	var classNameHidden = this.state.hidden ? " filter-trigger-hidden" : "";

    	if ( viewportTop > 350 ){
    		classNameHidden = classNameHidden+" filter-trigger-show";
    	}

        return (
			<button id="filterTrigger" data-show={toggle} className={"filter-trigger "+classNameHidden} data-maker={maker ? maker.id : "null"} onClick={this.toggleFilter}>
				<div className={className}></div>
			</button>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class FilterNavItemComponent extends React.Component {

    constructor(){
        super();
        this.state = {
        	toggle: MainEvents.TOGGLEFILTER
        }
        this.active = false;

        this.handleClick = _.bind(this.handleClick, this);
    }

    componentDidMount() {
    	this.active = true;
        MobileApplication.pipe.on(MainEvents.TOGGLEFILTER,(state)=>{
        	if ( this.active ){
	        	this.setState({ 
	        		toggle: state
	        	});
	        }
        });
    }

    handleClick(event){
    	var el = React.findDOMNode(this.refs.filterButton);
        let makerId = el.getAttribute("rel");
        MobileApplication.pipe.emit(MainEvents.FILTERMAKERS, makerId);
        MobileApplication.pipe.emit(MainEvents.TOGGLEFILTER, !this.state.toggle);
    }

    componentWillUnmount(){
    	this.active = false;
    }

    render(){
    	var m = this.props.data;

    	var active = this.props.makerId == m.id ? "active" : "";
    	var icon = this.props.makerId == m.id ? "icon-"+m.icon : "icon-"+m.icon+"-reversed";
    	
        return (
		    <li key={this.props.key}>
		        <button data-industry={m.icon} ref="filterButton" onClick={this.handleClick} rel={m.id} className={active}>
		        	<div className={icon}>
		        		<span className="assistive-text">{"Filter "+m.name}</span>
		        	</div>
		        </button>
		    </li>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class FilterNavComponent extends React.Component {

    constructor(){
        super();
        this.state = {
        	hidden: false,
        	toggle: MainEvents.TOGGLEFILTER
        }

        this.handleClick = _.bind(this.handleClick, this);
    }

    componentDidMount() {
    	MobileApplication.pipe.on(MainEvents.HIDEFILTER,(state)=>{
        	this.setState({ 
        		hidden: state
        	});
        });

        MobileApplication.pipe.on(MainEvents.TOGGLEFILTER,(state)=>{
        	this.setState({ 
        		toggle: state
        	});
        });
    }

    handleClick(event){
        MobileApplication.pipe.emit(MainEvents.TOGGLEFILTER, !this.state.toggle);
    }

    render(){
    	var { makerId, makerData } = this.props;

    	var filterItems = [];
		var className = this.state.hidden ? "timeline-filter timeline-filter-hidden" : "timeline-filter";

		_.forEach(makerData, function(item) {
    		filterItems.push(<FilterNavItemComponent key={item.maker+"-maker"} data={item} makerId={makerId} />);
		});

		if ( makerId ){
			filterItems.push(<FilterNavItemComponent key="0" data={{ id: null, icon: "close" }} makerId={makerId} />);
		}

        return (
			<ul className={className} id="filterButtons" data-show={!this.state.toggle} onClick={this.handleClick}>
			    {filterItems}
			</ul>
        )
    }
}