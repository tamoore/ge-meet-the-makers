import { Application } from '../../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../../main.jsx!';
import { LazyLoadImageComponent } from './image.jsx!';

export class BodyComponent extends React.Component {

	constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount(){
    }

    render(){
    	var { body, images, pq, pqCredit, type } = this.props;

    	var freq = 0;
    	var featureCount = 0;
    	var items = [];
    	var hasImages = false;
    	var hasPq = false;
    	var hasPqCredit = false;

    	if ( images ){
    		featureCount = images.length;
    		hasImages = true;
    	}
    	if ( pq ){
    		featureCount = featureCount+1;
    		hasPq = true;

    		if ( hasPq && pqCredit ){
    			hasPqCredit = true;
    		}
    	}
    	if ( body ){
    		items = body.match(/<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/g);
    	}    	
    	if ( featureCount ){
    		freq = Math.floor(items.length / featureCount);
    		if ( freq <= 0 ){
    			freq = 2;
    		}
    	}

    	var output = [];
    	var features = -1;
    	var paragraphs = 0;

    	var loopLength = 0;
    	if ( items.length > featureCount ){
    		loopLength = items.length;
    	} else if ( featureCount > items.length ){
    		loopLength = featureCount;
    	}

    	for ( var i = 1; i <= loopLength; i++ ){
    		if ( featureCount && features < images.length ){
	    		if ( i % freq == 0 ){
	    			if ( features == -1 && hasPq && hasPqCredit ){
	    				output.push(<blockquote key={i+"q"}>{pq}<p>{pqCredit}</p></blockquote>);
	    				features++;
	    			} else if ( features == -1 && hasPq && !hasPqCredit ){
	    				output.push(<blockquote key={i+"q"}>{pq}</blockquote>);
	    				features++;
	    			} else if ( hasImages && type !== "gallery" ) {
	    				features = features == -1 ? 0 : features;
	    				var img = images[features];
	    				output.push(<figure key={i+"i"}><LazyLoadImageComponent src={"http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"+img.src+".jpg"} alt={img.imageCaption} classes="" /></figure>);
	    				features++;
	    			}
	    		}
	    	}
			if ( items.length && paragraphs < items.length ){
    			var item = items[i-1];
    			item = item.replace(/<p>/g, "");
    			item = item.replace(/<\/p>/g, "");
    			output.push(<p key={i} dangerouslySetInnerHTML={{__html: item}}></p>);
    			paragraphs++;
    		}
    	}

        return (
        	<div className="article-body">
				{output}
			</div>
        )
    }
}