import { Application } from './index';

import React from 'react';

import Router from 'react-router';

/**
 * Default Rout for the Application
 */
let DefaultRoute = Router.DefaultRoute;
let RouterLink = Router.Link;
let Route = Router.Route;
let Redirect = Router.Redirect;
let RouteHandler = Router.RouteHandler;
let NotFoundRoute = Router.NotFoundRoute;

// Views
import { DataEvents, Data } from './data/data';
import { HeaderComponent, NavComponent } from './views/header.jsx!';
import { FilterButtonComponent, FilterNavComponent } from './views/filter.jsx!';
import { IntroComponent } from './views/intro.jsx!';
import { IndexComponent } from './views/index.jsx!';
import { MakersComponent } from './views/makers.jsx!';
import { MakerComponent } from './views/maker.jsx!';
import { ContentComponent } from './views/content.jsx!';
import { AboutComponent } from './views/about.jsx!';
import { FooterComponent } from './views/footer.jsx!';
import { NotFoundComponent } from './views/404.jsx!';

export class Main {

    constructor(){
        this.routes = (
            <Route name="app" path="/" handler={MainView}>
            	<Redirect from="/" to="/timeline" />
                <Route name="timeline" path="/timeline" handler={IndexComponent}/>
                <Route name="makers" path="/makers" handler={MakersComponent}/>
                <Route name="makers/:maker" path="makers/:maker" handler={MakerComponent}/>
                <Route name="content/:maker/:slug" path="content/:maker/:slug" handler={ContentComponent}/>
                <Route name="credits" path="/credits" handler={AboutComponent}/>
                <NotFoundRoute handler={NotFoundComponent} />
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
	HIDEFILTER: false,
	TOGGLEFILTER: true,
	VIEWPORT: {
		top: window.pageYOffset,
		height: window.innerHeight
	},
	IMGSIZE: "small"
};

export const MainDefaults = {
	BGIMAGE: "images/bg.blur.jpg",
}

export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
        	data: Data.result.content.length ? Data.result.content : this.attachDataHandler(),
            makerData: _.size(Data.result.makers) ? Data.result.makers : this.attachDataHandler(),
            currentMaker: MainEvents.FILTERMAKERS
        };

        this.updateViewport = _.bind(this.updateViewport, this);
		this.updateV = _.debounce(this.updateViewport, 300);

		this.prevWidth = window.innerWidth;
		this.breakpoint = 767;
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

        window.addEventListener('scroll', this.updateV, false);
		window.addEventListener('resize', this.updateV, false);
		this.updateViewport();

		var width = window.innerWidth;
		if ( width <= this.breakpoint ){
			Application.pipe.emit(MainEvents.IMGSIZE, "small");
			console.log("small");
		} else {
			Application.pipe.emit(MainEvents.IMGSIZE, "medium");
			console.log("medium");
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.updateV);
		window.removeEventListener('resize', this.updateV);
	}

	updateViewport() {
		var width = window.innerWidth;

		if ( this.prevWidth !== width ){
			this.prevWidth = width;
    		
    		if ( width <= this.breakpoint ){
				Application.pipe.emit(MainEvents.IMGSIZE, "small");
				console.log("small");
			} else {
				Application.pipe.emit(MainEvents.IMGSIZE, "medium");
				console.log("medium");
			}
    	}
		
		Application.pipe.emit(MainEvents.VIEWPORT, {
			top: window.pageYOffset,
			height: window.innerHeight
		});
	}

    render(){
    	var { currentMaker, data, makerData } = this.state;

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
                <RouteHandler key={name} page={name} makerId={currentMaker} makerData={makerData} data={data} />
                <FooterComponent />
            </div>
        )
    }
};

MainView.contextTypes = {
    router: React.PropTypes.func
}