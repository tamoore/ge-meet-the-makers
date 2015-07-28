/**
 * Individual Maker View
 */
import { MobileApplication } from '../index';

import React from 'react';
import marked from 'marked';

import { MainEvents, MainDefaults } from '../main.jsx!';
import { SocialNavComponent } from './elements/social.jsx!';
import { PostContentComponent } from './content/post.jsx!';
import { GalleryContentComponent } from './content/gallery.jsx!';
import { VideoContentComponent } from './content/video.jsx!';

/**
 * Component for Maker profile header
 */
export class ContentHeaderComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
		var { maker, content } = this.props;

		// Ensure time fits 00:00 format
    	var hour = content.metadata.timeline.hour.toString().length > 1 ? content.metadata.timeline.hour : "0"+content.metadata.timeline.hour;
    	var minute = content.metadata.timeline.minute.toString().length > 1 ? content.metadata.timeline.minute : "0"+content.metadata.timeline.minute;

        return (
			<header className="maker-details">
				<i className={"industry-icon icon-"+maker.icon}></i>
				<div className="time">
					{hour}:{minute}
				</div>
				<a href={"#/makers/"+maker.slug}>
					<div className="profile">
						<h3>{maker.role}</h3>
						<h2>{maker.name}</h2>
					</div>
					<img src={maker.portraitImg} alt={maker.name+" - "+maker.role} />
				</a>
			</header>
        )
    }
}

/**
 * Component for Maker article
 */
export class ContentArticleComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var { content } = this.props;

    	switch ( content.type ){
			case "post":
				return (
					<PostContentComponent content={content} />
		        );
		        break;
			case "gallery":
				return (
					<GalleryContentComponent content={content} />
		        );
		        break;
		    case "video":
				return (
					<VideoContentComponent content={content} />
		        );
		        break;
		    default:
				console.log("Error: Unknown content.");
				return false;
		        break;
	    }
    }
}

/**
 * Component for Maker footer, including Maker pagination
 */
export class ContentFooterComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var { makerId, makerData, data, contentIndex, content } = this.props;

    	// Pagination count and Prev/Next links
    	var contentCount = data.length;
    	var next = contentIndex < contentCount-1 ? contentIndex+1 : 0;
    	var prev = contentIndex > 0 ? contentIndex-1 : contentCount-1;
    	var nextContent = data[next];
    	var prevContent = data[prev];
		var nextMakerSlug = makerData[nextContent.maker].slug;
    	var prevMakerSlug = makerData[prevContent.maker].slug;

    	var makersName = "";
    	if ( makerId ){
    		makersName = makerData[makerId].name+"'s ";
    	}

        return (
			<footer>
				<SocialNavComponent twitter={null} facebook={null} linkedin={null} twitterMsg={content.twitterMessage} />
				<div className="page-nav border-bottom">
					<a className="page-nav-previous" href={"#/content/"+prevMakerSlug+"/"+prevContent.slug}>Previous</a>
					<div className="page-nav-counter">{contentIndex+1} of {contentCount}</div>
					<a className="page-nav-next" href={"#/content/"+nextMakerSlug+"/"+nextContent.slug}>Next</a>
				</div>
				<a className="link-wide border-bottom" href="#/timeline"><i className="arrow-back"></i>Back to {makersName}timeline</a>
			</footer>
        )
    }
}

/**
 * Component for Individual Maker View
 */
export class ContentComponent extends React.Component {
    
    constructor(){
        super();
    }

	componentDidMount() {
		MobileApplication.pipe.emit(MainEvents.HIDEFILTER, true);
	}
    
    render(){
    	var { makerId, data, makerData, params } = this.props;
    	var filteredData = data;
    	var bgImg, maker, makerKey;

		if ( !makerId ){
			// Find requested Maker
			makerKey = _.findKey(makerData, function(m) {
	    		return m.slug == params.maker;
			});

			var bgImg = makerData[makerKey].bgImg;
			var maker = makerData[makerKey];
		} else {
			makerKey = makerId;
			var bgImg = makerData[makerId].bgImg;
			var maker = makerData[makerId];

			filteredData = _.filter(data, { 'maker': makerId });
		}

		// Find requested Content
		var pathSlug = params.slug;
		var contentIndex = _.findIndex(filteredData, function(c) {
    		return c.slug == pathSlug && c.maker == makerKey;
		});
		var content = filteredData[contentIndex];

		return (
            <main className="mobile-maker-content" style={{backgroundImage: "url("+bgImg+")"}}>
            	<div className="texture-overlay"></div>
            	<div className="content-container">
					<ContentHeaderComponent makerId={makerId} maker={maker} content={content} />
					<ContentArticleComponent content={content} />
					<ContentFooterComponent makerId={makerId} makerData={makerData} data={filteredData} contentIndex={contentIndex} content={content} />
				</div>
			</main>
        )
    }
}