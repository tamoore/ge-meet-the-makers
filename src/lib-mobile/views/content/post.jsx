import { Application } from '../../index';

import React from 'react';
import marked from 'marked';

import { MainEvents, MainDefaults } from '../../main.jsx!';
import { LazyLoadImageComponent } from '../elements/image.jsx!';

export class PostContentComponent extends React.Component {
    
    constructor(){
        super();
    }

    render(){
    	var { content } = this.props;
		
    	/*
		var output = [];

    	var bodyArray = content.body.split(/<div>|<\/div>/g);
    	if ( bodyArray.length > 1 ){
    		for ( var i = 0; i < bodyArray.length; i++ ){
    			if ( _.startsWith(bodyArray[i], '<LazyLoadImageComponent') ){
    				// LazyLoad Image
    				var src = "";
    				var alt = "";
    				var classes = "";
    				var string = _.trimLeft(bodyArray[i], '<LazyLoadImageComponent ');
    				var string = _.trimRight(string, '/>');
    				var params = string.split(/="|"| /g);
    				for ( var r = 1; r <= params.length; r+2 ){
    					switch (params[r]){
    						case "src": src = params[r+1]; break;
    						case "alt": alt = params[r+1]; break;
    						case "classes": classes = params[r+1]; break;
    						default: break;
    					}
    				}
    				output.push(<LazyLoadImageComponent src={src} alt={alt} classes={classes} />);
    			} else {
    				// Regular Markdown Content
    				var body = marked(bodyArray[i].toString(), {sanitize: true});
    				output.push(<div dangerouslySetInnerHTML={{__html: body}}></div>);
    			}
    		}
    	}
    	*/

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