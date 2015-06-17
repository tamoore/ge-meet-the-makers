/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';

import React from 'react';
import marked from 'marked';

import { DataEvents, Data } from '../data/data';
import { MainEvents, MakersData } from '../main.jsx!';

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class ProfileHeaderComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
		var m = this.props.maker;
		var p = m.furniture.portraitImg;
        return (
			<header className="maker-details">
				<i className="industry-icon icon-industry-energy"></i>
				<div className="profile">
					<h3>{m.role}</h3>
					<h2>{m.name}</h2>
				</div>
				<img src={p} alt={m.name+" - "+m.role} />
			</header>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class ProfileArticleComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
        return (
			<article>
				<h1 className="title">This is a title for this content about the maker. So bold right now.</h1>
				<figure>
					<img src="../images/makers/bg.winch.jpg" alt="" />
					<figcaption>
						<p>The proof is in the pudding, and the pudding, in this case, is a football</p>
					</figcaption>
				</figure>
				<p>Do you know what this bathroom says to me? Aqua. Which is French for water. It's like being inside an enormous Fox's Glacier Mint. Which, again, to me is a bonus.</p>
				<p>Minor criticism. I like to keep a bit more distance between the egg and the beans. I may want to mix them but that’s my decision. Use the sausage as a breakwater....but that’s nitpicking, on the whole a very good effort...Seven on ten. Let’s make love.</p>
				<p>And, can I have the same, please? But with different shaped pasta. What do you call those pasta in bows? Like a bow-tie, but miniature? Like an action man bow-tie.</p>
				<p>The temperature inside this apple pie is over one thousand degrees. If I squeeze it, a jet of molten bramley apple will squirt out. Could go your way; could go mine. Either way, one of us is going down.</p>
				<p>I know lying is wrong, but if the elephant man came in now in a blouse with some make up on, and said "how do I look?" Would you say — bearing in mind he's depressed and has respiratory problems — would you say "go and take that blusher off you mis-shapen headed elephant tranny"? No. You'd say "You look nice... John"</p>
			</article>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class ProfileFooterComponent extends React.Component {

    constructor(){
        super();
    }

    render(){
        return (
			<footer>
				<ul className="nav-social">
					<li><a><svg viewBox="0 0 514 514"><path d="M375.7 123.5H138.3c-8.1 0-14.7 6.6-14.7 14.7v237.4c0 8.1 6.6 14.7 14.7 14.7h127.8V287.1h-34.8v-40.3h34.8v-29.7c0-34.5 21.1-53.2 51.8-53.2 14.7 0 27.4 1.1 31.1 1.6v36l-21.3 0c-16.7 0-20 7.9-20 19.6v25.7h39.9l-5.2 40.3h-34.7v103.4h68c8.1 0 14.7-6.6 14.7-14.7V138.3C390.4 130.1 383.8 123.5 375.7 123.5z"/><circle fill="none" stroke="#000000" stroke-width="16" stroke-miterlimit="10" cx="257" cy="257" r="249"/></svg><span className="assistive-text">Facebook</span></a></li>
					<li><a><svg viewBox="0 0 514 514"><defs><rect x="93.9" y="135.5" width="326.2" height="265.1"/></defs><clipPath><use overflow="visible"/></clipPath><path clip-path="url(#SVGID_2_)" d="M196.4 400.6c-37.8 0-73-11.1-102.6-30.1 5.2 0.6 10.6 0.9 16 0.9 31.4 0 60.2-10.7 83.1-28.7 -29.3-0.5-54-19.9-62.5-46.5 4.1 0.8 8.3 1.2 12.6 1.2 6.1 0 12-0.8 17.6-2.3 -30.6-6.1-53.7-33.2-53.7-65.6 0-0.3 0-0.6 0-0.8 9 5 19.3 8 30.3 8.4 -18-12-29.8-32.5-29.8-55.7 0-12.3 3.3-23.8 9.1-33.6 33 40.5 82.3 67.1 138 69.9 -1.1-4.9-1.7-10-1.7-15.3 0-37 30-66.9 66.9-66.9 19.3 0 36.6 8.1 48.9 21.1 15.2-3 29.6-8.6 42.5-16.2 -5 15.6-15.6 28.7-29.4 37 13.5-1.6 26.4-5.2 38.4-10.5 -9 13.4-20.3 25.2-33.4 34.6 0.1 2.9 0.2 5.8 0.2 8.7C386.9 298.6 319.5 400.6 196.4 400.6"/><circle fill="none" stroke="#000000" stroke-width="16" stroke-miterlimit="10" cx="257" cy="257" r="249"/></svg><span className="assistive-text">Twitter</span></a></li>
				</ul>
				<a className="link-wide">Explore their timeline</a>
				<div className="page-nav">
					<a className="page-nav-previous">Previous</a>
					<div className="page-nav-counter">1 of 54</div>
					<a className="page-nav-next">Next</a>
				</div>
				<a className="link-wide">Back to Meet the makers</a>
				<a className="link-wide"><i className="arrow-back"></i>Back to timeline</a>
			</footer>
        )
    }
}

/**
 * View for the header Filters on the timeline primarily
 *
 */
export class MakerComponent extends React.Component {
    
    constructor(){
        super();
        this.state = {
            makerData: {}
        }
    }

	componentDidMount() {
		$.ajax({
			url: "../lib-mobile/data/makers.json",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({makerData: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error("doh");
			}.bind(this)
		});
	}
    
    render(){
		var bgImg = "../images/bg.blur.jpg";
    	var maker = {};
    	
    	if ( !_.isEmpty(this.state.makerData) ){
    		var path = this.props.params.maker;
    		var key = _.findKey(this.state.makerData, function(chr) {
	    		return chr.slug == path;
			});

    		bgImg = this.state.makerData[key].furniture.bgImg;
    		maker = this.state.makerData[key];
    	}

        return (
            <main className="mobile-maker" style={{backgroundImage: "url("+bgImg+")"}}>
            	<div className="texture-overlay"></div>
            	<div className="profile-container">
					<ProfileHeaderComponent maker={maker} />
					<ProfileArticleComponent maker={maker} />
					<ProfileFooterComponent maker={maker} />
				</div>
			</main>
        )
    }
}
