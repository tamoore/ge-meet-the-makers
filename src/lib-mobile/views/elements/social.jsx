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

    	socialLinks.push(<li key="fb"><a target="_blank" href={this.props.facebook}><i className="icon-facebook"></i><span className="assistive-text">Facebook</span></a></li>);
    	socialLinks.push(<li key="li"><a target="_blank" href={this.props.linkedin}><i className="icon-linkedin"></i><span className="assistive-text">LinkedIn</span></a></li>);
   		socialLinks.push(<li key="tw"><a target="_blank" href={this.props.twitter}><i className="icon-twitter"></i><span className="assistive-text">Twitter</span></a></li>);

        return (
			<ul className="nav-social">
				{socialLinks}
			</ul>
        )
    }
}