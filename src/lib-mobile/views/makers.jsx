/**
 * View for the maker Component includes ClockView
 */
import { Application } from '../index';

import React from 'react';

export class MakersComponent extends React.Component {
    
    constructor(){
        super();
    }
    
    render(){
        return (
            <main className="mobile-makers">
				<ul>
					<li className="maker-mobile maker-tezuka">
						<a href="#/makers/1">
							<i className="maker-industry-icon icon-industry-space"></i>
							<h3 className="maker-industry">Astronaut</h3>
							<h2>Osamu Tezuka</h2>
						</a>
					</li>
					<li className="maker-mobile maker-wolff">
						<a href="#/makers/2">
							<i className="maker-industry-icon icon-industry-factory"></i>
							<h3 className="maker-industry">Engineer</h3>
							<h2>Susie Wolff</h2>
						</a>
					</li>
					<li className="maker-mobile maker-fletcher">
						<a href="#/makers/3">
							<i className="maker-industry-icon icon-industry-energy"></i>
							<h3 className="maker-industry">Engineer</h3>
							<h2>Adam Fletcher</h2>
						</a>
					</li>
					<li className="maker-mobile maker-dough">
						<a href="#/makers/4">
							<i className="maker-industry-icon icon-industry-fuel"></i>
							<h3 className="maker-industry">Miner</h3>
							<h2>Dosie Dough</h2>
						</a>
					</li>
					<li className="maker-mobile maker-spaceman">
						<a href="#/makers/5">
							<i className="maker-industry-icon icon-industry-transport"></i>
							<h3 className="maker-industry">Electrician</h3>
							<h2>Leo Spaceman</h2>
						</a>
					</li>
					<li className="maker-mobile maker-ratched">
						<a href="#/makers/6">
							<i className="maker-industry-icon icon-industry-medical"></i>
							<h3 className="maker-industry">Technician</h3>
							<h2>Nurse Ratched</h2>
						</a>
					</li>
				</ul>
			</main>
        )
    }
}
