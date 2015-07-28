import { MobileApplication } from '../../index';

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
			height: 0,
			showImage: false,
			loader: 'images/loading.png',
			imgSize: "small"
        }
        this.active = false;
        this.el = null;
    }

    componentDidMount(){
    	this.active = true;
    	MobileApplication.pipe.on(MainEvents.VIEWPORT,(viewport)=>{
    		if ( this.active ){
	        	this.setState({ 
	        		viewport: viewport
	        	});
	       	}
        });

        MobileApplication.pipe.on(MainEvents.IMGSIZE,(size)=>{
        	this.setState({ 
        		imgSize: size
        	});
        });

        this.el = React.findDOMNode(this.refs.image);
        this.setState({
        	height: this.el.offsetHeight
        }, this.updatePosition());
    }

    componentDidUpdate(){
    	this.updatePosition();
    }

    componentWillUnmount(){
    	this.active = false;
    }

    updatePosition() {
    	var { showImage, viewport, height } = this.state;

    	if ( showImage ){
			return;
		}

		// update showImage state if component element is in the viewport
		var min = viewport.top - ( 1.5 * viewport.height );
		var max = viewport.top + ( 3 * viewport.height );

		if (this.el.offsetTop+height <= max && this.el.offsetTop >= min) {
			this.setState({
				showImage: true
			});
		}
	}

    render(){
    	var { src, alt, classes } = this.props;
    	var { showImage, loader, imgSize } = this.state;

    	var path = showImage ? src+"_"+imgSize+".png" : loader;
    	var className = showImage ? "" : " loading";

        return (
			<div className="lazyload" data-visible={showImage}>
				<img src={path} alt={alt} ref="image" className={classes+className} />
			</div>
        )
    }
}