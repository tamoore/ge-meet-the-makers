/**
 * Individual Maker View
 */
import { Application } from '../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../main.jsx!';
import { SocialNavComponent } from './elements/social.jsx!';
import { LazyLoadImageComponent } from './elements/image.jsx!';
import { BodyComponent } from './elements/body.jsx!';

/**
 * Component for Maker profile header
 */
export class ProfileHeaderComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
		var { maker } = this.props;

        return (
			<header className="maker-details">
				<i className={"industry-icon icon-"+maker.icon}></i>
				<div className="profile-outer">
					<div className="profile">
						<h3>{maker.role}</h3>
						<h2>{maker.name}</h2>
					</div>
					<img src={maker.portraitImg} alt={maker.name+" - "+maker.role} />
				</div>
			</header>
        )
    }
}

/**
 * Component for Maker article
 */
export class ProfileArticleComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
    	var { maker } = this.props;

        return (
			<article>
				<h1 className="title">{maker.title}</h1>
				<figure>
					<LazyLoadImageComponent src={maker.figure.img} alt={maker.figure.caption} classes="" />
					<figcaption>
						<p>{maker.figure.caption}</p>
					</figcaption>
				</figure>
				<BodyComponent body={maker.body} images={maker.images} pq={maker.pq} pqCredit={maker.pqCredit} type="maker" />
			</article>
        )
    }
}

/**
 * Component for Maker footer Timeline link
 */
export class FooterTimelineLinkComponent extends React.Component {

    constructor(){
        super();
        this.handleClick = _.bind(this.handleClick, this);
    }

    // Click event for Timeline button that updates MainEvents.FILTERMAKERS to this maker's ID
    handleClick(){
    	Application.pipe.emit(MainEvents.FILTERMAKERS, this.props.makerId.toString());
    }

    render(){
        return (
			<a className="link-wide border-bottom" onClick={this.handleClick} href="#/timeline">Explore their timeline</a>
        )
    }
}

/**
 * Component for Maker footer, including Maker pagination
 */
export class ProfileFooterComponent extends React.Component {

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
				<SocialNavComponent twitter={maker.twitterMessage} />
				<FooterTimelineLinkComponent makerId={makerId} />
				<div className="page-nav border-bottom">
					<a className="page-nav-previous" href={"#/makers/"+prevMaker}>Previous</a>
					<div className="page-nav-counter">{makerId} of {makerCount}</div>
					<a className="page-nav-next" href={"#/makers/"+nextMaker}>Next</a>
				</div>
				<a className="link-wide border-bottom" href="#/makers">Back to Meet the makers</a>
				<a className="link-wide border-bottom" href="#/timeline"><i className="arrow-back"></i>Back to timeline</a>
			</footer>
        )
    }
}

/**
 * Component for Individual Maker View
 */
export class MakerComponent extends React.Component {
    
    constructor(){
        super();
    }

	componentDidMount() {
		Application.pipe.emit(MainEvents.HIDEFILTER, true);
	}
    
    render(){
    	var { makerId, makerData, params } = this.props;

    	// Set view defaults
		var bgImg = MainDefaults.BGIMAGE;

		// Find requested Maker
		var path = params.maker;
		var key = _.findKey(makerData, function(chr) {
    		return chr.slug == path;
		});

		// Find Maker data for render
		bgImg = makerData[key].bgImg;
		var maker = makerData[key];

		return (
            <main className="mobile-maker" style={{backgroundImage: "url("+bgImg+")"}}>
            	<div className="texture-overlay"></div>
            	<div className="profile-container">
					<ProfileHeaderComponent maker={maker} />
					<ProfileArticleComponent maker={maker} />
					<ProfileFooterComponent makerId={maker.id} makerData={makerData} />
				</div>
			</main>
        )
    }
}
