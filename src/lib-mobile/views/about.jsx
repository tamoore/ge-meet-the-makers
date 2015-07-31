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

						<p><strong>Production</strong><br />
							Tom Ross</p>

						<p><strong>Art Direction</strong><br />
							Taylor Wallace</p>

						<p><strong>Technical Lead</strong><br/>
							Todd Moore
						</p>

						<p><strong>Design</strong><br />
							Jeremy Yun</p>

						<p><strong>Mobile Development</strong><br />
							Ash Jonceski</p>

						<p><strong>Desktop Development</strong><br />
							Todd Moore</p>

						<p><strong>Video Production</strong><br />
							Where There’s Smoke</p>

						<p><strong>GE Communications Director</strong><br />
							Monique McLaughlin</p>

						<p><strong>Executive Producer</strong><br />
							Chris Breen</p>

						<p><strong>With thanks to:</strong></p>

						<p><img src="images/logos/ge_logo.png" alt="GE" /><br />
						<img src="images/logos/ger_logo.png" alt="GE Reports" /><br />
						<img src="images/logos/guardianlabs_logo.png" alt="Guardian Labs" /><br />
						<img src="images/logos/csiro_logo.png" alt="CSIRO" /><br />
						<img src="images/logos/calimmune_logo.png" alt="Callimmune" /><br />
						<img src="images/logos/mnf_logo.png" alt="Marine National Facility" /><br />
						<img src="images/logos/saber_logo.png" alt="Saber Aeronautics" /><br />
						<img src="images/logos/va_logo.png" alt="Virgin Australia" /><br />
						<img src="images/logos/rh_logo.png" alt="Roy Hill" /><br />
						<img src="images/logos/calimmune_logo.png" alt="Calimmune" /></p>
					</article>
				</div>
			</main>
        )
    }
}
