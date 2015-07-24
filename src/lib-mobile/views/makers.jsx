/**
 * Makers View
 */
import { Application } from '../index';

import React from 'react';

import { MainEvents } from '../main.jsx!';

/**
 * Component for each Maker list item
 */
export class MakersItemComponent extends React.Component {

    constructor(){
        super();
        this.state = {
        	imgSize: "small"
        }
    }

    componentDidMount(){
    	Application.pipe.on(MainEvents.IMGSIZE,(size)=>{
        	this.setState({ 
        		imgSize: size
        	});
        });
    }
  
    render(){
    	var { maker, key } = this.props;

        return (
			<li key={key} className={"maker-mobile maker-"+maker.slug} style={{backgroundImage: "url("+maker.makerImg+")"}}>
				<a href={"#/makers/"+maker.slug}>
					<i className={"maker-industry-icon icon-"+maker.icon}></i>
					<h3 className="maker-industry">{maker.role}</h3>
					<h2>{maker.name}</h2>
				</a>
			</li>
        )
    }
}

/**
 * Component for Makers View
 */
export class MakersComponent extends React.Component {

    constructor(){
        super();
    }

	componentDidMount() {
		// Hide the Timeline Filter
		Application.pipe.emit(MainEvents.HIDEFILTER, true);
	}
  
    render(){
    	var { makerData } = this.props;

    	// Loop through each Maker in makerData and add MakerItem to array for render
    	var makerItems = [];
    	_.forEach(makerData, function(item) {
    		makerItems.push(<MakersItemComponent key={item.id} maker={item} />);
		});

        return (
            <main className="mobile-makers">
				<ul>
					{makerItems}
				</ul>
			</main>
        )
    }
}