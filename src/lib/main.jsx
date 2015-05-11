import { Application } from './index';
import config from './config';

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
import { ClockView } from './views/clock.jsx!';
import { TimelineComponent } from './views/timeline.jsx!';
import { TimelineBackgroundComponent } from './views/timeline.jsx!';
import { HeaderComponent } from './views/header.jsx!';
import { MakerComponent } from './views/maker.jsx!';
import { IndexComponent } from './views/index.jsx!';
import { FooterComponent } from './views/footer.jsx!';

export class Main {
    constructor(){
        this.routes = (
            <Route name="app" path="/" handler={MainView}>
                <Route name="index" handler={IndexComponent}/>
                <Route name="timeline" handler={TimelineComponent}/>
                <DefaultRoute handler={TimelineComponent}/>
            </Route>
        )
        Router.run(this.routes, (Handler)=>{
            React.render(<Handler/>, document.body);
        })
    }
}

export class MainView extends React.Component {

    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <HeaderComponent />
                <MakerComponent />
                <TransitionGroup component="div" transitionName="fade">
                    <TimelineBackgroundComponent  />
                    <RouteHandler/>
                </TransitionGroup>
                <FooterComponent />
            </div>
        )
    }
}