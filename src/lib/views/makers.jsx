/**
 * View for Makers Panel
 *
 */
import { Application } from '../index';

import React from 'react';
import { MainEvents } from '../main.jsx!';

export class MeetTheMakersComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            klass: ""
        }
        this.hideMakers = _.bind(this.hideMakers, this);
        Application.pipe.on(MainEvents.SHOWMAKERS, _.bind(this.handleShowMakers, this));
    }
    componentWillMount(){

    }

    componentDidMount(){
    }

    componentWillUnmount(){

    }

    handleShowMakers(){
        setTimeout(()=>{
            this.setState({
                active: "active"
            })
        }, 1000)
    }

    hideMakers(){
        Application.pipe.emit(MainEvents.HIDEMAKERS);
        this.setState({
            active: ""
        })
    }

    render(){
        return (
            <div>
                <footer className="base" data-state={this.state.active}>
                    <h1 onClick={this.hideMakers}>
                        Timeline
                    </h1>
                    <img className="logo-guardian" src="images/logo.guardian.svg" alt="The Guardian" />
                    <nav className="controls">
                        <ul>
                            <li><a>About this content</a></li>
                            <li><a id="footer-audio"><span className="assistive-text">Audio</span></a></li>
                            <li><a id="footer-facebook"> <span className="assistive-text">Facebook</span> </a></li>
                            <li><a id="footer-twitter">  <span className="assistive-text">Twitter</span>  </a></li>
                            <li><a id="footer-linkedin"> <span className="assistive-text">LinkedIn</span> </a></li>
                        </ul>
                    </nav>
                </footer>
                <div id="makerPanels" className="makers meet-the-makers-component">

                    <section className="maker-panel" data-state="init">
                        <div className="maker-panel-background maker-01"></div>

                        <header>
                            <img src="images/makers/profile.png" alt="Maker Name" className="maker-portrait" />
                            <h3 className="maker-title">Engineer</h3>
                            <h2 className="maker-name">Adam Fletcher</h2>
                            <img src="images/icon.space.svg" alt="Maker Industry Icon" className="maker-industry" />
                        </header>

                        <div className="maker-bio-excerpt">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium massa id ante laoreet congue. Donec justo nulla, volutpat quis dapibus quis, pharetra id quam. In hendrerit, dolor vehicula pulvinar finibus, dolor sapien elementum dui, et sagittis nisl quam vel orci. Aliquam fringilla mattis mauris, id eleifend nulla tempus at. Sed pretium tellus ac mauris placerat faucibus. Nunc eu congue augue.</p>
                            <p><a href="makers-bio.html">Read More</a></p>
                        </div>

                    </section>

                    <section className="maker-panel" data-state="init">
                        <div className="maker-panel-background maker-02"></div>

                        <header>
                            <img src="images/makers/profile.png" alt="Maker Name" className="maker-portrait" />
                            <h3 className="maker-title">Astronaut</h3>
                            <h2 className="maker-name">Leo Spaceman</h2>
                            <img src="images/icon.factory.svg" alt="Maker Industry Icon" className="maker-industry" />
                        </header>

                        <div className="maker-bio-excerpt">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium massa id ante laoreet congue. Donec justo nulla, volutpat quis dapibus quis, pharetra id quam. In hendrerit, dolor vehicula pulvinar finibus, dolor sapien elementum dui, et sagittis nisl quam vel orci. Aliquam fringilla mattis mauris, id eleifend nulla tempus at. Sed pretium tellus ac mauris placerat faucibus. Nunc eu congue augue.</p>
                            <p><a href="makers-bio.html">Read More</a></p>
                        </div>

                    </section>

                    <section className="maker-panel" data-state="init">
                        <div className="maker-panel-background maker-03"></div>

                        <header>
                            <img src="images/makers/profile.png" alt="Maker Name" className="maker-portrait" />
                            <h3 className="maker-title">Technician</h3>
                            <h2 className="maker-name">Doris Deigh</h2>
                            <img src="images/icon.petrol.svg" alt="Maker Industry Icon" className="maker-industry" />
                        </header>

                        <div className="maker-bio-excerpt">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium massa id ante laoreet congue. Donec justo nulla, volutpat quis dapibus quis, pharetra id quam. In hendrerit, dolor vehicula pulvinar finibus, dolor sapien elementum dui, et sagittis nisl quam vel orci. Aliquam fringilla mattis mauris, id eleifend nulla tempus at. Sed pretium tellus ac mauris placerat faucibus. Nunc eu congue augue.</p>
                            <p><a href="makers-bio.html">Read More</a></p>
                        </div>

                    </section>

                    <section className="maker-panel" data-state="init">
                        <div className="maker-panel-background maker-04"></div>

                        <header>
                            <img src="images/makers/profile.png" alt="Maker Name" className="maker-portrait" />
                            <h3 className="maker-title">Engineer</h3>
                            <h2 className="maker-name">Adam Fletcher</h2>
                            <img src="images/icon.solar.svg" alt="Maker Industry Icon" className="maker-industry" />
                        </header>

                        <div className="maker-bio-excerpt">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium massa id ante laoreet congue. Donec justo nulla, volutpat quis dapibus quis, pharetra id quam. In hendrerit, dolor vehicula pulvinar finibus, dolor sapien elementum dui, et sagittis nisl quam vel orci. Aliquam fringilla mattis mauris, id eleifend nulla tempus at. Sed pretium tellus ac mauris placerat faucibus. Nunc eu congue augue.</p>
                            <p><a href="makers-bio.html">Read More</a></p>
                        </div>

                    </section>

                    <section className="maker-panel" data-state="init">
                        <div className="maker-panel-background maker-05"></div>

                        <header>
                            <img src="images/makers/profile.png" alt="Maker Name" className="maker-portrait" />
                            <h3 className="maker-title">Astronaut</h3>
                            <h2 className="maker-name">Leo Spaceman</h2>
                            <img src="images/icon.train.svg" alt="Maker Industry Icon" className="maker-industry" />
                        </header>

                        <div className="maker-bio-excerpt">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium massa id ante laoreet congue. Donec justo nulla, volutpat quis dapibus quis, pharetra id quam. In hendrerit, dolor vehicula pulvinar finibus, dolor sapien elementum dui, et sagittis nisl quam vel orci. Aliquam fringilla mattis mauris, id eleifend nulla tempus at. Sed pretium tellus ac mauris placerat faucibus. Nunc eu congue augue.</p>
                            <p><a href="makers-bio.html">Read More</a></p>
                        </div>

                    </section>

                    <section className="maker-panel" data-state="init">
                            <div className="maker-panel-background maker-06"></div>

                            <header>
                                <img src="images/makers/profile.png" alt="Maker Name" className="maker-portrait" />
                                <h3 className="maker-title">Celebrity Chef</h3>
                                <h2 className="maker-name">Uncle Muscles</h2>
                                <img src="images/icon.healthcare.svg" alt="Maker Industry Icon" className="maker-industry" />
                            </header>

                            <div className="maker-bio-excerpt">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium massa id ante laoreet congue. Donec justo nulla, volutpat quis dapibus quis, pharetra id quam. In hendrerit, dolor vehicula pulvinar finibus, dolor sapien elementum dui, et sagittis nisl quam vel orci. Aliquam fringilla mattis mauris, id eleifend nulla tempus at. Sed pretium tellus ac mauris placerat faucibus. Nunc eu congue augue.</p>
                                <p><a href="makers-bio.html">Read More</a></p>
                            </div>

                    </section>

                </div>
            </div>
        )
    }
}




