import { Application } from '../../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../../main.jsx!';
import { LazyLoadImageComponent } from '../elements/image.jsx!';

export class VideoContentComponent extends React.Component {
    
    constructor(){
        super();
    }

    playVideo(event){
    	var classes = event.target.parentNode.getAttribute("class");
    	event.target.parentNode.setAttribute("class", classes+" video-active");

    	// video
    	var video = document.createElement("iframe");
    	//video.src = "https://www.youtube.com/embed/"+this.props.ytid+"?showinfo=0";
    	video.src = "https://www.youtube.com/embed/3xWPfkZ1ZjQ?showinfo=0&autoplay=1";
        video.className = "video";
        video.allowfullscreen = true;
        video.width = "640";
        video.height = "360";

        event.target.parentNode.appendChild(video);
    }

    render(){
    	var { content } = this.props;

        return (
			<article className="type-post">
				<h1 className="title">{content.title}</h1>
				<figure className="video">
					<div className="video-overlay" onClick={this.playVideo}></div>
					<LazyLoadImageComponent src={"http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"+content.furniture.mainImage+".jpg"} alt="" classes="video-placeholder" />
				</figure>
				<div dangerouslySetInnerHTML={{__html: content.body}}></div>
			</article>
        )
    }
}