/**
 * Individual Maker View
 */
import { Application } from '../index';

import React from 'react';
import marked from 'marked';

import { MainEvents, MainDefaults } from '../main.jsx!';

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
				<i className={"industry-icon icon-industry-"+maker.furniture.icon}></i>
				<div className="time">
					{hour}:{minute}
				</div>
				<div className="profile">
					<h3>{maker.role}</h3>
					<h2>{maker.name}</h2>
				</div>
				<img src={maker.furniture.portraitImg} alt={maker.name+" - "+maker.role} />
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

    	// Convert bio Markdown to HTML for render
    	var body = marked(content.body.toString(), {sanitize: true});

        return (
			<article>
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

/**
 * Component for Maker footer, including Maker pagination
 */
export class ContentFooterComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var { makerData, makerId } = this.props;
    	var maker = makerData[makerId];

    	// Pagination count and Prev/Next links
    	var makerCount = _.size(makerData);
    	var next = makerId < makerCount ? makerId+1 : 1;
    	var prev = makerId > 1 ? makerId-1 : makerCount;
    	var nextMaker = makerData[next].slug;
    	var prevMaker = makerData[prev].slug;

        return (
			<footer>
				<ul className="nav-social border-bottom">
					<li><a><svg viewBox="0 0 514 514"><path d="M375.7 123.5H138.3c-8.1 0-14.7 6.6-14.7 14.7v237.4c0 8.1 6.6 14.7 14.7 14.7h127.8V287.1h-34.8v-40.3h34.8v-29.7c0-34.5 21.1-53.2 51.8-53.2 14.7 0 27.4 1.1 31.1 1.6v36l-21.3 0c-16.7 0-20 7.9-20 19.6v25.7h39.9l-5.2 40.3h-34.7v103.4h68c8.1 0 14.7-6.6 14.7-14.7V138.3C390.4 130.1 383.8 123.5 375.7 123.5z"/><circle fill="none" stroke="#000000" stroke-width="16" stroke-miterlimit="10" cx="257" cy="257" r="249"/></svg><span className="assistive-text">Facebook</span></a></li>
					<li><a><svg viewBox="0 0 514 514"><defs><rect x="93.9" y="135.5" width="326.2" height="265.1"/></defs><clipPath><use overflow="visible"/></clipPath><path clip-path="url(#SVGID_2_)" d="M196.4 400.6c-37.8 0-73-11.1-102.6-30.1 5.2 0.6 10.6 0.9 16 0.9 31.4 0 60.2-10.7 83.1-28.7 -29.3-0.5-54-19.9-62.5-46.5 4.1 0.8 8.3 1.2 12.6 1.2 6.1 0 12-0.8 17.6-2.3 -30.6-6.1-53.7-33.2-53.7-65.6 0-0.3 0-0.6 0-0.8 9 5 19.3 8 30.3 8.4 -18-12-29.8-32.5-29.8-55.7 0-12.3 3.3-23.8 9.1-33.6 33 40.5 82.3 67.1 138 69.9 -1.1-4.9-1.7-10-1.7-15.3 0-37 30-66.9 66.9-66.9 19.3 0 36.6 8.1 48.9 21.1 15.2-3 29.6-8.6 42.5-16.2 -5 15.6-15.6 28.7-29.4 37 13.5-1.6 26.4-5.2 38.4-10.5 -9 13.4-20.3 25.2-33.4 34.6 0.1 2.9 0.2 5.8 0.2 8.7C386.9 298.6 319.5 400.6 196.4 400.6"/><circle fill="none" stroke="#000000" stroke-width="16" stroke-miterlimit="10" cx="257" cy="257" r="249"/></svg><span className="assistive-text">Twitter</span></a></li>
				</ul>
				<div className="page-nav border-bottom">
					<a className="page-nav-previous" href={"#/makers/"+prevMaker}>Previous</a>
					<div className="page-nav-counter">{makerId} of {makerCount}</div>
					<a className="page-nav-next" href={"#/makers/"+nextMaker}>Next</a>
				</div>
				<a className="link-wide border-bottom" href="#/makers">Back to Meet the makers</a>
				<a className="link-wide border-bottom" href="#/"><i className="arrow-back"></i>Back to timeline</a>
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
		Application.pipe.emit(MainEvents.HIDEFILTER, true);
	}
    
    render(){
    	var { makerId, data, makerData, params } = this.props;

    	// Set view defaults
		var bgImg = MainDefaults.BGIMAGE;

		// Find requested Maker
		var pathMaker = params.maker;
		var makerKey = _.findKey(makerData, function(m) {
    		return m.slug == pathMaker;
		});

		// Find requested Content
		var pathGuid = params.guid;
		var contentIndex = _.findIndex(data, function(c) {
    		return c.maker == makerKey && c.guid == pathGuid;
		});

		// Find Maker data for render
		bgImg = makerData[makerKey].furniture.bgImg;
		var maker = makerData[makerKey];
		var content = data[contentIndex];

		return (
            <main className="mobile-maker" style={{backgroundImage: "url("+bgImg+")"}}>
            	<div className="texture-overlay"></div>
            	<div className="profile-container">
					<ContentHeaderComponent maker={maker} content={content} />
					<ContentArticleComponent content={content} />
					<ContentFooterComponent makerId={maker.id} makerData={makerData} />
				</div>
			</main>
        )
    }
}