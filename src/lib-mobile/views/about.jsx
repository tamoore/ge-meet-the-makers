/**
 * About View
 */
import { MobileApplication } from '../index';

import React from 'react';

import { MainEvents } from '../main.jsx!';

/**
 * Component for About View
 */
export class AboutComponent extends React.Component {
   
    constructor(){
        super();
    }

    componentDidMount() {
		MobileApplication.pipe.emit(MainEvents.HIDEFILTER, true);
	}

    render(){
        return (
            <main className="mobile-about">
            	<div className="texture-overlay"></div>
            	<div className="content-container">
					<article className="type-post">
						<h1 className="title bordered">Credits</h1>
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
						<img src="images/logos/ger_logo.png" alt="GE Reports" /><br />
						<img src="images/logos/CSIRO_logo.png" alt="CSIRO" /><br />
						<img src="images/logos/mnf_logo.png" alt="Marine National Facility" /><br />
						<img src="images/logos/saber_logo.png" alt="Saber Aeronautics" /><br />
						<img src="images/logos/va_logo.png" alt="Virgin Australia" /><br />
						<img src="images/logos/rh_logo.png" alt="Roy Hill" /></p>
					</article>
				</div>
			</main>
        )
    }
}
