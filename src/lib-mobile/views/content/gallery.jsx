import { Application } from '../../index';

import React from 'react';
import marked from 'marked';

import { MainEvents, MainDefaults } from '../../main.jsx!';

export class GalleryContentComponent extends React.Component {
    
    constructor(){
        super();
    }

    render(){
    	var { content } = this.props;

    	// Convert bio Markdown to HTML for render
    	var body = marked(content.body.toString(), {sanitize: true});

        return (
			<article className="type-post">
				<h1 className="title">{content.title}</h1>
				<figure>
					<img src={"http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"+content.furniture.mainImage+".jpg"} alt={content.furniture.standfirst} />
					<figcaption>
						<p>{content.furniture.standfirst}</p>
					</figcaption>
				</figure>
				<div dangerouslySetInnerHTML={{__html: body}}></div>
			</article>
        )
    }
}