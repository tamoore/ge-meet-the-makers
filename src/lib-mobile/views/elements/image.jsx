import { Application } from '../../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../../main.jsx!';

export class LazyLoadImageComponent extends React.Component {

	constructor(){
        super();
        this.state = {
        	viewport: {
        		top: MainEvents.VIEWPORT.top,
				height: MainEvents.VIEWPORT.height
			},
			showImage: false,
			loader: 'images/loading.png'
        }
        this.active = false;
    }

    componentDidMount(){
    	this.active = true;
    	Application.pipe.on(MainEvents.VIEWPORT,(viewport)=>{
    		if ( this.active ){
	        	this.setState({ 
	        		viewport: viewport
	        	});
	       	}
        });

        this.updatePosition();
    }

    componentDidUpdate(){
    	this.updatePosition();
    }

    componentWillUnmount(){
    	this.active = false;
    }

    updatePosition() {
    	var { showImage, viewport } = this.state;

		if (showImage) {
			return;
		}

		var el = React.findDOMNode(this.refs.image);

		// update showImage state if component element is in the viewport
		var min = viewport.top - viewport.height;
		var max = viewport.top + ( 1.5 * viewport.height );

		if (min <= (el.offsetTop + el.offsetHeight) && el.offsetTop <= max) {
			this.setState({
				showImage: true
			});
		}
	}

    render(){
    	var { src, alt, classes } = this.props;
    	var { showImage, loader } = this.state;

    	var path = showImage ? src : loader;
    	var className = showImage ? "" : " loading";

        return (
			<div className="lazyload">
				<img src={path} alt={alt} ref="image" data-visible={showImage} className={classes+className} />
			</div>
        )
    }
}