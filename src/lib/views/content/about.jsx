import { Application } from '../../index';
import { CloseButtonComponent } from '../close.jsx!';
import { TimelineBackgroundComponent, TimelineEvents } from '../timeline.jsx!';
import { DataEvents, Data } from '../../data/data';
import { MainEvents } from '../../main.jsx!';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

import key from 'keymaster';
import React from 'react';
import marked from 'marked';

import GeminiScrollbar from 'gemini-scrollbar';

export class ReactGeminiScrollbar extends React.Component {

    constructor() {
        super()
        this.scrollbar = null;
    }


    getDefaultProps() {
        return {
            autoshow: false
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            this.scrollbar = new GeminiScrollbar({
                element: React.findDOMNode(this.refs.scrollbar),
                autoshow: this.props.autoshow,
                createElements: false
            }).create();
        }, 1000);

    }

    componentDidUpdate() {
        // this.scrollbar.update();
    }

    componentWillUnmount() {
        this.scrollbar.destroy();
        this.scrollbar = null;
    }

    render() {
        var {className, children} = this.props,
            classes = '';

        if (className) {
            classes += ' ' + className;
        }

        return (
            <div className={classes} ref="scrollbar">
                <div className='gm-scrollbar -vertical'>
                    <div className='thumb'></div>
                </div>
                <div className='gm-scrollbar -horizontal'>
                    <div className='thumb'></div>
                </div>
                <div className='gm-scroll-view' ref='scroll-view'>
                    {children}
                </div>
            </div>
        );
    }
}

export class AboutContentComponent extends React.Component {
    constructor(){
        super();


    }

    componentWillMount(){
        key('esc', ()=>{
            this.isActive = false;
            return window.location.hash = "#/timeline"
        })

    }

    componentDidMount(){

    }


    componentWillUnmount(){
        this.setState({
            "state": "show",
            "apply": "deactivate"
        });
        Application.pipe.emit(MainEvents.MAKERTITLE, 0);
        document.querySelector('.gm-scroll-view').removeEventListener('scroll', this.handleScroll);
    }


    render(){
        var fbShare = "http://www.facebook.com/sharer/sharer.php?u=http://labs.theguardian.com/innovation-never-sleeps/"+window.location.hash.replace("#", "%23");
        return (
            <div className="post-content-component">
                <CloseButtonComponent />
                <aside className="aside">
                    <a href={fbShare} className="shareComponent facebookShare--button"><span className="assistive-text">Facebook</span></a>
                    <a href="http://twitter.com/share?text=Over 24 hours they change our seas, skies and solar system. Meet the makers&url=http://labs.theguardian.com/innovation-never-sleeps&hashtags=InnovationNeverSleeps, interactive" className="shareComponent twitterShare--button"><span className="assistive-text">Twitter</span></a>
                </aside>
                <ReactGeminiScrollbar className="article">
                    <article className="content" >
                        <h1>Credits</h1>
                        <p><strong>Editor: Guardian Labs Australia</strong><br />
                            Claire Porter</p>

                        <p><strong>Editors: GE Reports</strong><br />
                            Jane Nicholls<br />
                            Natalie Filatoff</p>

                        <p><strong>Sub Editor</strong><br />
                            Will Temple</p>

                        <p><strong>Production</strong><br />
                            Tom Ross</p>

                        <p><strong>Art Direction</strong><br />
                            Taylor Wallace</p>

                        <p><strong>Design</strong><br />
                            Jeremy Yun</p>

                        <p><strong>Development</strong><br />
                            Todd Moore<br />
                            Ash Jonceski</p>

                        <p><strong>Video Production</strong><br />
                            Where There’s Smoke</p>

                        <p><strong>GE Communications Director</strong><br />
                            Monique McLaughlin</p>

                        <p><strong>Executive Producer</strong><br />
                            Chris Breen</p>

                        <p><strong>With thanks to:</strong></p>

                        <p><img src="images/logos/ge_logo.png" alt="GE" /><br />
                            <a href="http://gereports.com.au/" target="_blank"><img src="images/logos/ger_logo.png" alt="GE Reports" /></a><br />
                            <img src="images/logos/CSIRO_logo.png" alt="CSIRO" /><br />
                            <img src="images/logos/mnf_logo.png" alt="Marine National Facility" /><br />
                            <img src="images/logos/saber_logo.png" alt="Saber Aeronautics" /><br />
                            <img src="images/logos/va_logo.png" alt="Virgin Australia" /><br />
                            <img src="images/logos/rh_logo.png" alt="Roy Hill" /></p>


                    </article>
                </ReactGeminiScrollbar>
            </div>
        )
    }
}
AboutContentComponent.contextTypes = {
    router: React.PropTypes.func
}