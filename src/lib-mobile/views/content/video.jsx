import { Application } from '../../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../../main.jsx!';
import { LazyLoadImageComponent } from '../elements/image.jsx!';
import { BodyComponent } from '../elements/body.jsx!';

export class VideoContentComponent extends React.Component {
    
    constructor(){
        super();
    }

    render(){
    	var { content } = this.props;

    	// video
    	var ytid = this.props.ytid ? this.props.ytid : "3xWPfkZ1ZjQ";
    	var src = "https://www.youtube.com/embed/"+ytid+"?showinfo=0&autoplay=1";
        var className = "video";
        var allowfullscreen = true;
        var width = "640";
        var height = "360";

		var standfirst = content.furniture.standfirst ? <p className="standfirst">{content.furniture.standfirst}</p> : "";

        return (
			<article className="type-post">
				<h1 className="title">{content.title}</h1>
				<figure className="video lazyload">
					<iframe src={src} className={className} allowfullscreen={allowfullscreen} width={width} height={height}></iframe>
					<img src="images/loading.png" alt="" classes="video-placeholder" />
				</figure>
				{standfirst}
				<BodyComponent body={content.body} images={content.images} pq={content.pq} pqCredit={content.pqCredit} type="video" />
			</article>
        )
    }
}