import { MobileApplication } from '../../index';

import React from 'react';

import { MainEvents, MainDefaults } from '../../main.jsx!';

export class SocialNavComponent extends React.Component {

	constructor(){
        super();
    }

    render(){
    	var { twitterMsg, twitter, facebook, linkedin } = this.props;
    	var socialLinks = [];
    	var current = window.location.href;

    	twitter = twitter ? twitter : current;
    	twitter = twitterMsg ? twitterMsg+" "+twitter : twitter;
    	facebook = facebook ? facebook : current;
    	linkedin = linkedin ? linkedin : current;

    	socialLinks.push(<li key="fb"><a target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href)+"&ref=responsive&ret=login&display=popup"}><i className="icon-facebook"></i><span className="assistive-text">Facebook</span></a></li>);
    	socialLinks.push(<li key="li"><a target="_blank" href={"http://www.linkedin.com/shareArticle?mini=true&amp;url="+encodeURIComponent(window.location.href)}><i className="icon-linkedin"></i><span className="assistive-text">LinkedIn</span></a></li>);
   		socialLinks.push(<li key="tw"><a target="_blank" href={"https://twitter.com/intent/tweet?text="+encodeURIComponent(twitter)}><i className="icon-twitter"></i><span className="assistive-text">Twitter</span></a></li>);

        return (
			<ul className="nav-social">
				{socialLinks}
			</ul>
        )
    }
}