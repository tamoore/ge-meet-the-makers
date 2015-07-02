import { Application } from '../../index';

import React from 'react';
import marked from 'marked';

import { MainEvents, MainDefaults } from '../../main.jsx!';

export class VideoContentComponent extends React.Component {
    
    constructor(){
        super();
    }

    showVideo(){
    	var el = React.findDOMNode(this.refs.video);
    	var youtubeId = el.getAttribute("data-youtube-id");

    	var video = document.createElement('iframe');
        video.width = window.innerWidth;
        video.height = ( window.innerWidth / 3 ) * 2;
        video.src = "https://www.youtube.com/embed/"+youtubeId;
    	
    	myAnchor.parentNode.replaceChild(video, el);
    }

    render(){
    	var { content } = this.props;

    	// Convert bio Markdown to HTML for render
    	var body = marked(content.body.toString(), {sanitize: true});

        return (
			<article className="type-post">
				<h1 className="title">{content.title}</h1>
				<figure>

					<img onClick={this.showVideo} data-youtube-id="0LLoR4Y597I" src={"http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"+content.furniture.mainImage+".jpg"} alt={content.furniture.standfirst} ref="video" />
				</figure>
				<div dangerouslySetInnerHTML={{__html: body}}></div>
			</article>
        )
    }
}