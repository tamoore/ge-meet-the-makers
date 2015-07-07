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
import { ClockView } from './views/clock.jsx!';
import { TimelineComponent } from './views/timeline.jsx!';
import { TimelineBackgroundComponent } from './views/timeline.jsx!';
import { HeaderComponent } from './views/header.jsx!';
import { MakerComponent } from './views/maker.jsx!';
import { IndexComponent } from './views/index.jsx!';
import { FooterComponent } from './views/footer.jsx!';
import { MeetTheMakersComponent } from './views/makers.jsx!';

import { VideosContentComponent } from './views/content/video.jsx!'
import { PostsContentComponent } from './views/content/post.jsx!';
import { GalleryContentComponent } from './views/content/gallery.jsx!';


export class Main {
    constructor(){
        this.routes = (
            <Route name="app" path="/" handler={MainView}>
                <Route name="index" handler={IndexComponent}/>
                <Route name="timeline" handler={TimelineComponent}/>
                <Route name="content/video/:maker/:id" handler={VideosContentComponent}/>
                <Route name="content/post/:maker/:id" handler={PostsContentComponent}/>
                <Route name="maker/:makerName" handler={PostsContentComponent}/>
                <Route name="content/gallery/:maker/:id" handler={GalleryContentComponent}/>
                <DefaultRoute handler={TimelineComponent} />
            </Route>
        )
        Router.run(this.routes, (Handler)=>{
            React.render(<Handler/>, document.body);
        })
    }
}

export const MainEvents = {
    SHOWMAKERS: "mainevents:showmakers",
    HIDEMAKERS: "mainevents:hidemakers",
    FILTERMAKERS: "mainevents:filtermakers",
    MAKERTITLE: "mainevents:makertitle",
    SHOWMAKERBIO: "mainevents:showmakerbio"
};

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            mainPanelKlass: ""
        }
        Application.pipe.on(MainEvents.SHOWMAKERS, _.bind(this.handleShowMakers, this))
        Application.pipe.on(MainEvents.HIDEMAKERS, _.bind(this.handleHideMakers, this));
        Application.pipe.on(MainEvents.SHOWMAKERBIO, _.bind(this.handleShowMakersBio, this));
    }

    handleShowMakers(){
        this.setState({
            mainPanelKlass: "makers-enter"
        });

    }

    handleHideMakers(){
        this.setState({
            mainPanelKlass: "makers-leave"
        });
    }
    handleShowMakersBio(){
        this.setState({
            mainPanelKlass: "makers-leave"
        });
    }

    render(){
        var name = this.context.router.getCurrentPath();

        return (
            <div ref="Main">
                <div className="meet-the-makers-wrapper" data-active={this.state.mainPanelKlass}>
                    <MeetTheMakersComponent />
                </div>
                <div id="main-panel" className={this.state.mainPanelKlass}>
                    <HeaderComponent currentRoute={name}  />
                    <MakerComponent />
                    <TimelineBackgroundComponent  />
                    <TransitionGroup component="div" transitionName="section">
                        <RouteHandler key={name} />
                    </TransitionGroup>
                    <FooterComponent />
                </div>
            </div>
        )
    }
};

MainView.contextTypes = {
    router: React.PropTypes.func
}