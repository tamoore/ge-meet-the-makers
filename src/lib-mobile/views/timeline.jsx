/**
 * Timeline View
 */
import { Application } from '../index';

import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { MainEvents } from '../main.jsx!';

/**
 * Component for Timeline header/intro
 */
export class TimelineHeadComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var { maker } = this.props;

    	// If Maker data exists render a maker specific header
    	if ( maker ){
    		var ha = "<h1><strong>"+maker.role+"</strong>"+maker.name+"</h1>";
    		var icon = '<i class="icon-industry icon-industry-'+maker.furniture.icon+'"></i>';

	    	return (
				<header className="introduction maker-intro" data-maker={maker.id}>
					<span dangerouslySetInnerHTML={{__html: ha}}></span>
					<h2><strong>24 hours</strong> in the lives of Australia’s top innovators</h2>
					<div dangerouslySetInnerHTML={{__html: icon}}></div>
					<i className="icon-down-indicator"></i>
				</header>
	        )
	    // Else render the generic/default header
	    } else {
	    	return (
	    		<header className="introduction" data-maker="null">
					<h1><strong>Innovation<br />never sleeps</strong> Meet the makers</h1>
					<h2><strong>24 hours</strong> in the lives of Australia’s top innovators</h2>
					<i className="icon-down-indicator"></i>
				</header>
	    	);
	    }
    }
}

/**
 * Component for Timeline item images, enables Lazy load
 */
export class TimelineItemImageComponent extends React.Component {

    constructor(){
        super();
    }

    componentDidUpdate(prevProps) {
		if (!this.props.showImages && prevProps.viewport) {
			this.updatePosition();
		}
	}

	updatePosition() {
		var el = React.findDOMNode(this.refs.image);
		this.props.updateImagePosition(el.offsetTop, el.offsetHeight);
	}

	render(){
    	var { src, alt, loader, showImage } = this.props;
    	var img = (this.props.showImage) ? src : loader;
    	var className = (this.props.showImage) ? "" : "loading";

		return (
			<img src={img} alt={alt} ref="image" data-visible={showImage} className={className} />
		)
    }
}
TimelineItemImageComponent.defaultProps = {
	loader: '../images/loading.png',
	showImage: false
};

/**
 * Component for individual Timeline items, can include posts or Maker quotes
 */
export class TimelineItemComponent extends React.Component {

    constructor(){
        super();
        this.state = {
        	showImage: false
        };
        this.updateImagePosition = _.bind(this.updateImagePosition, this);
        this.setShowImage = _.bind(this.setShowImage, this);
    }

    componentWillMount() {
		// allow image display override
		if (this.props.showImage) {
			setShowImage(true);
		}
	}

    updateImagePosition(top, height) {

		// image is already displayed, no need to check anything
		if (this.state.showImage) {
			return;
		}

		// update showImage state if component element is in the viewport
		var min = this.props.viewport.top - this.props.viewport.height;
		var max = this.props.viewport.top + ( 2 * this.props.viewport.height );

		if ((min <= (top + height) && top <= (max - 300))) {
			this.setShowImage(true);
		}
	}

	setShowImage(show) {
		this.setState({
			showImage: !!(show)
		});
	}

    render(){
    	var { key, data, maker, viewport } = this.props;

    	// Ensure time fits 00:00 format
    	var hour = data.metadata.timeline.hour.toString().length > 1 ? data.metadata.timeline.hour : "0"+data.metadata.timeline.hour;
    	var minute = data.metadata.timeline.minute.toString().length > 1 ? data.metadata.timeline.minute : "0"+data.metadata.timeline.minute;

        return (
        	<li key={key} className="timeline-list-marker" data-maker={maker.id}>
				<header className="maker-details timeline-marker-meta">
					<i className={"icon-industry icon-industry-"+maker.furniture.icon}></i>
					<time>{hour}:{minute}</time>
					<a href={"#/makers/"+maker.slug}>
						<div className="profile">
							<h3>{maker.role}</h3>
							<h2>{maker.name}</h2>
						</div>
						<img src={maker.furniture.portraitImg} alt={maker.name} />
					</a>
				</header>
				<div className="timeline-content-preview">
					<a href={"#/content/"+maker.slug+"/"+data.guid}>
						<div className="preview-media mask-skew">
							<TimelineItemImageComponent src={maker.furniture.makerImg} alt={data.title} viewport={viewport} showImage={this.state.showImage} updateImagePosition={this.updateImagePosition} />
						</div>
					</a>
						<div className="timeline-content-meta">
							<i className={"icon-content-type icon-content-"+data.type}></i>
							<span className="label-content-type">{data.type}</span>
						</div>
					<a href={"#/content/"+maker.slug+"/"+data.guid}>
						<h2 className="title">{data.title}</h2>
					</a>
				</div>
			</li>
        )
    }
}
TimelineItemComponent.defaultProps = {
	showImage: false
};

/**
 * Component for Timeline View
 */
export class TimelineComponent extends React.Component {

    constructor(){
        super();
        this.state = {
			viewport: {
				top: 0,
				height: 0
			}
		};
		this.updateViewport = _.bind(this.updateViewport, this);
		this.updateV = _.debounce(this.updateViewport, 500);
    }

    componentDidMount() {
		window.addEventListener('scroll', this.updateV, false);
		window.addEventListener('resize', this.updateV, false);
		this.updateViewport();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.updateV);
		window.removeEventListener('resize', this.updateV);
	}

	updateViewport() {
		this.setState({
			viewport: {
				top: window.pageYOffset,
				height: window.innerHeight
			}
		});
	}

    render(){
		var { makerId, data, makerData } = this.props;
		var timelineItems = [];
		var self = this;

		// Loop through timeline items
		for ( var i = 0; i < data.length; i++ ){
    		var item = data[i];
    		
    		// Check if Maker is set and filter, otherwise allow all
    		if ( !makerId || item.maker == makerId ){
    			var maker = makerData[item.maker];
	    		timelineItems.push(<TimelineItemComponent key={item.guid} data={item} maker={maker} viewport={self.state.viewport} />);
    		}
    	}

        return (
        	<ol className="timeline-list" data-maker={makerId}>
		        {timelineItems}
		    </ol>
        )
    }
}