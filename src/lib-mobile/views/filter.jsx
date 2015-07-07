/**
 * View for the header Filters on the timeline primarily
 *
 */
import { Application } from '../index';

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
        	viewportTop: 0
        }

        this.filterVisibility = _.bind(this.filterVisibility, this);
		this.filterV = _.debounce(this.filterVisibility, 100);
    }

    componentDidMount() {
    	Application.pipe.on(MainEvents.HIDEFILTER,(state)=>{
        	this.setState({ 
        		hidden: state
        	});
        });

        window.addEventListener('scroll', this.filterV, false);
		window.addEventListener('resize', this.filterV, false);
		this.filterVisibility();
    }

    componentWillUnmount() {
		window.removeEventListener('scroll', this.filterV, false);
		window.removeEventListener('resize', this.filterV, false);
	}

	filterVisibility(){
		this.setState({
			viewportTop: window.pageYOffset
		});
	}

    render(){
    	var { maker } = this.props;
    	var { viewportTop } = this.state;

    	var className = maker ? "icon-industry icon-"+maker.icon+" filter-trigger" : "icon-industry icon-filter filter-trigger";
    	var classNameHidden = this.state.hidden ? " filter-trigger-hidden" : "";

    	if ( viewportTop > 450 ){
    		className = className+" filter-trigger-show";
    	}

        return (
			<button id="filterTrigger" className={className+classNameHidden} data-maker={maker ? maker.id : "null"}></button>
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
        this.handleClick = _.bind(this.handleClick, this);
    }

    handleClick(event){
        let makerId = event.target.getAttribute("rel");
        this.props.makerId == makerId ? makerId = null : false;
        Application.pipe.emit(MainEvents.FILTERMAKERS, makerId);
    }

    render(){
    	var m = this.props.data;
    	var icon;
    	if ( m.id ){
    		icon = this.props.makerId == m.id ? "selected icon-"+m.icon : "icon-"+m.icon+"-reversed"
    	} else {
    		icon = this.props.makerId == m.id ? "selected icon-"+m.icon : "icon-"+m.icon+"-reversed"
    	}
    	
        return (
		    <li key={this.props.key}>
		        <button data-industry={m.icon} onClick={this.handleClick} rel={m.id} className={icon}>
		        	<span className="assistive-text">{"Filter "+m.name}</span>
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
        	hidden: false
        }
    }

    componentDidMount() {
    	Application.pipe.on(MainEvents.HIDEFILTER,(state)=>{
        	this.setState({ 
        		hidden: state
        	});
        });
    }

    render(){
    	var { makerId, makerData } = this.props;

    	var filterItems = [];
		var className = this.state.hidden ? "timeline-filter timeline-filter-hidden" : "timeline-filter";

		_.forEach(makerData, function(item) {
    		filterItems.push(<FilterNavItemComponent key={item.id} data={item} makerId={makerId} />);
		});

		if ( makerId ){
			filterItems.push(<FilterNavItemComponent key="0" data={{ id: null, icon: "close" }} makerId={makerId} />);
		}

        return (
			<ul className={className}>
			    {filterItems}
			</ul>
        )
    }
}