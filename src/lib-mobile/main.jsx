import { Application } from './index';

import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Router from 'react-router';

/**
 * Default Rout for the Application
 */
let DefaultRoute = Router.DefaultRoute;
let RouterLink = Router.Link;
let Route = Router.Route;
let RouteHandler = Router.RouteHandler;

// Views
import { DataEvents, Data } from './data/data';
import { HeaderComponent, NavComponent } from './views/header.jsx!';
import { FilterButtonComponent, FilterNavComponent } from './views/filter.jsx!';
import { IndexComponent } from './views/index.jsx!';
import { MakersComponent } from './views/makers.jsx!';
import { MakerComponent } from './views/maker.jsx!';
import { AboutComponent } from './views/about.jsx!';
import { FooterComponent } from './views/footer.jsx!';

export class Main {

    constructor(){
        this.routes = (
            <Route name="app" path="/" handler={MainView}>
                <Route name="makers" path="/makers" handler={MakersComponent}/>
                <Route name="makers/:maker" path="makers/:maker" handler={MakerComponent}/>
                <Route name="about" path="/about" handler={AboutComponent}/>
                <DefaultRoute handler={IndexComponent} />
            </Route>
        )
        Router.run(this.routes, (Handler)=>{
            React.render(<Handler/>, document.body);
        })
    }

}

export const MainEvents = {
	FILTERMAKERS: null,
	HIDEFILTER: false
};

export const MainDefaults = {
	BGIMAGE: "../images/bg.blur.jpg",
}

export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
        	data: Data.result.content.length ? Data.result.content : this.attachDataHandler(),
            makerData: _.size(Data.result.makers) ? Data.result.makers : this.attachDataHandler(),
            currentMaker: MainEvents.FILTERMAKERS
        }
    }

    attachDataHandler(){
        Application.pipe.on(DataEvents.UPDATE, _.bind(this.handleDataUpdate, this));
    }

    handleDataUpdate(resp){
        this.setState({
            data: resp.content,
            makerData: resp.makers
        })
    }

    componentDidMount(){
		Application.pipe.on(MainEvents.FILTERMAKERS,(makerId)=>{
        	this.setState({ 
        		currentMaker: makerId
        	});
        });

		/*
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
		*/
	}

    render(){
    	var { currentMaker, data, makerData } = this.state;

    	if ( !_.isEmpty(makerData) ){
	    	var name = this.context.router.getCurrentPath();
	    	var maker = null;

	    	if ( currentMaker ){
	    		maker = makerData[currentMaker];
	    	}

	        return (
				<div id="mobileWrap" className="mtm-wrap">
	                <HeaderComponent />
	                <NavComponent page={name} />
	                <FilterButtonComponent maker={maker} />
	                <FilterNavComponent makerId={currentMaker} makerData={makerData} />
	                <TransitionGroup component="div" transitionName="section">
	                	<RouteHandler key={name} page={name} makerId={currentMaker} makerData={makerData} data={data} />
	                </TransitionGroup>
	                <FooterComponent />
	            </div>
	        )
	    } else {
	    	return false;
	    }
    }
};

MainView.contextTypes = {
    router: React.PropTypes.func
}