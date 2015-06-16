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
import { HeaderComponent, NavComponent } from './views/header.jsx!';
import { IndexComponent } from './views/index.jsx!';
import { MakersComponent } from './views/makers.jsx!';
import { MakerComponent } from './views/maker.jsx!';
import { AboutComponent } from './views/about.jsx!';
import { FooterComponent } from './views/footer.jsx!';

export class Main {

    constructor(){
        this.routes = (
            <Route name="app" path="/" handler={MainView}>
                <Route name="makers" handler={MakersComponent}/>
                <Route name="makers/:maker" handler={MakerComponent}/>
                <Route name="about" handler={AboutComponent}/>
                <DefaultRoute handler={IndexComponent} />
            </Route>
        )
        Router.run(this.routes, (Handler)=>{
            React.render(<Handler/>, document.body);
        })
    }

}

export const MainEvents = {
	FILTERMAKERS: "mainevents:filtermakers"
};

export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {};
    }

    render(){
    	var name = this.context.router.getCurrentPath();

        return (
			<div id="mobileWrap" className="mtm-wrap">
                <HeaderComponent />
                <NavComponent page={name} />
                <TransitionGroup component="div" transitionName="section">
                	<RouteHandler key={name} />
                </TransitionGroup>
                <FooterComponent />
            </div>
        )
    }
};

MainView.contextTypes = {
    router: React.PropTypes.func
}