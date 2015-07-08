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
    }

    componentDidMount() {
    	Application.pipe.on(MainEvents.HIDEFILTER,(state)=>{
        	this.setState({ 
        		hidden: state
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

    render(){
    	var { maker } = this.props;
    	var { viewportTop } = this.state;

    	var className = maker ? "icon-industry icon-"+maker.icon : "icon-industry icon-filter";
    	var classNameHidden = this.state.hidden ? " filter-trigger-hidden" : "";

    	if ( viewportTop > 350 ){
    		classNameHidden = classNameHidden+" filter-trigger-show";
    	}

        return (
			<button id="filterTrigger" className={"filter-trigger "+classNameHidden} data-maker={maker ? maker.id : "null"}>
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
        this.handleClick = _.bind(this.handleClick, this);
    }

    handleClick(event){
        let makerId = event.target.parentElement.getAttribute("rel");
        Application.pipe.emit(MainEvents.FILTERMAKERS, makerId);
    }

    render(){
    	var m = this.props.data;

    	var active = this.props.makerId == m.id ? "active" : "";
    	var icon = this.props.makerId == m.id ? "icon-"+m.icon : "icon-"+m.icon+"-reversed";
    	
        return (
		    <li key={this.props.key}>
		        <button data-industry={m.icon} onClick={this.handleClick} rel={m.id} className={active}>
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