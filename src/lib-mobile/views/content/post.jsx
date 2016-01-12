import { MobileApplication } from '../../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../../main.jsx!';
import { LazyLoadImageComponent } from '../elements/image.jsx!';
import { BodyComponent } from '../elements/body.jsx!';

export class PostContentComponent extends React.Component {
    
    constructor(){
        super();
    }

    render(){
    	var { content } = this.props;

    	var figure = content.furniture.mainImageCaption ? content.furniture.mainImageCaption : "";
    	figure = figure != "" ? figure : figure;
    	figure = content.furniture.mainImageCredit ? figure+" Credit: "+content.furniture.mainImageCredit : "";

    	var standfirst = content.furniture.standfirst ? <p className="standfirst">{content.furniture.standfirst}</p> : "";

        return (
			<article className="type-post">
				<h1 className="title">{content.title}</h1>
				<figure>
					<LazyLoadImageComponent src={"http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"+content.furniture.mainImage} alt={content.furniture.standfirst} classes="" />
					<figcaption>
						<p>{figure}</p>
					</figcaption>
				</figure>
				{standfirst}
				<BodyComponent body={content.body} images={content.images} pq={content.pq} pqCredit={content.pqCredit} type="post" />
			</article>
        )
    }
}