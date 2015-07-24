import { Application } from '../../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../../main.jsx!';
import { LazyLoadImageComponent } from '../elements/image.jsx!';
import { BodyComponent } from '../elements/body.jsx!';

export class GalleryImageComponent extends React.Component {

	constructor(){
        super();
    }

    render(){
    	var { key, data } = this.props;

    	var caption = data.imageCaption ? data.imageCaption : null;
	    caption = caption && data.imageCredit ? caption+" Credit: "+data.imageCredit : caption;

        return (
			<li className="gallery-image" key={key}>
				<figure><LazyLoadImageComponent src={"http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"+data.src} alt={data.imageCaption} classes="" /><figcaption><p>{caption}</p></figcaption></figure>
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

    	// Build gallery items
    	for ( var i = 0; i < content.images.length; i++ )
    	{
    		galleryImages.push(<GalleryImageComponent key={i} data={content.images[i]} />);
    	}

    	var standfirst = content.furniture.standfirst ? <p className="standfirst">{content.furniture.standfirst}</p> : "";

        return (
			<article className="type-gallery">
				<h1 className="title">{content.title}</h1>
				{standfirst}
				<BodyComponent body={content.body} images={content.images} pq={content.pq} pqCredit={content.pqCredit} type="gallery" />
				<ul className="gallery">
					{galleryImages}
				</ul>
			</article>
        )
    }
}