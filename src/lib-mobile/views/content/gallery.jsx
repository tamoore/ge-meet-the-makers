import { Application } from '../../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../../main.jsx!';
import { LazyLoadImageComponent } from '../elements/image.jsx!';

export class GalleryImageComponent extends React.Component {

	constructor(){
        super();
    }

    render(){
    	var { key, data } = this.props;

        return (
			<li className="gallery-image" key={key}>
				<LazyLoadImageComponent src={"http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"+data.src+".jpg"} alt={data.alt} classes="" />
			</li>
        )
    }
}

export class GalleryContentComponent extends React.Component {
    
    constructor(){
        super();
    }

    render(){
    	var { content } = this.props;
    	var galleryImages = [];
    	var body = content.body;

    	// Build gallery items
    	for ( var i = 0; i < content.images.length; i++ )
    	{
    		galleryImages.push(<GalleryImageComponent key={i} data={content.images[i]} />);
    	}

        return (
			<article className="type-gallery">
				<h1 className="title">{content.title}</h1>
				<div dangerouslySetInnerHTML={{__html: body}}></div>
				<ul className="gallery">
					{galleryImages}
				</ul>
			</article>
        )
    }
}