import { Application } from '../../index';

import React from 'react';
import marked from 'marked';

import { MainEvents, MainDefaults } from '../../main.jsx!';

export class VideoContentComponent extends React.Component {
    
    constructor(){
        super();
    }

    playVideo(event){
    	event.target.setAttribute("class", "hide");

    	// video
    	var video = document.createElement("iframe");
    	//video.src = "https://www.youtube.com/embed/"+this.props.ytid+"?showinfo=0";
    	video.src = "https://www.youtube.com/embed/3xWPfkZ1ZjQ?showinfo=0";
        video.className = "video";
        video.allowfullscreen = true;
        video.width = 560;
        video.border = 0;

        event.target.parentNode.appendChild(video);
    }

    render(){
    	var { content } = this.props;

    	// Convert bio Markdown to HTML for render
    	var body = marked(content.body.toString(), {sanitize: true});

        return (
			<article className="type-post">
				<h1 className="title">{content.title}</h1>
				<figure className="video-figure" style={{ backgroundImage: "http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"+content.furniture.mainImage+".jpg" }}>
					<div className="texture-overlay video-overlay" onClick={this.playVideo}>Play</div>
				</figure>
				<div dangerouslySetInnerHTML={{__html: body}}></div>
			</article>
        )
    }
}