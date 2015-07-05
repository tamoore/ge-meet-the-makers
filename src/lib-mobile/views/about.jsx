/**
 * About View
 */
import { Application } from '../index';

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
		Application.pipe.emit(MainEvents.HIDEFILTER, true);
	}

    render(){
        return (
            <main className="mobile-about">
            	<div className="texture-overlay"></div>
            	<div className="content-container">
					<article className="type-post">
						<h1 className="title">About this Content</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut euismod neque. Praesent mollis libero non ipsum fringilla, id fermentum nisi dignissim. Nulla nunc erat, pulvinar in nisl ac, pellentesque blandit lorem. Vestibulum malesuada ex eu mauris cursus, vel scelerisque ipsum dictum. Donec suscipit, neque vitae congue ullamcorper, erat risus cursus nulla, ut imperdiet leo odio non nisl. Donec blandit ac nunc et tincidunt. Nullam in iaculis tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus risus eu odio egestas ultrices. Sed sagittis neque ut risus viverra, congue laoreet magna porttitor. Quisque sodales tellus non justo consectetur efficitur. Proin lacus risus, condimentum mattis tortor nec, suscipit sagittis enim. Integer eleifend ut ex in interdum. Sed porta, massa vel mattis varius, mauris ligula auctor nisl, et laoreet justo metus nec lorem.</p>
						<p>Morbi non dapibus eros. Morbi et cursus est. Nullam congue lorem ut massa lacinia, molestie auctor sapien hendrerit. Quisque dictum sapien in hendrerit hendrerit. Praesent nec malesuada odio, tristique dictum massa. Maecenas interdum lorem vitae mollis posuere. Sed commodo elit leo, nec suscipit dui bibendum ac. In hac habitasse platea dictumst. Nulla facilisi. Duis eget velit facilisis, maximus neque non, finibus ex. Ut cursus ligula vel eros vestibulum, id tempor odio porta. Curabitur non sapien urna. Mauris malesuada sagittis commodo. Nulla eget mattis turpis, eu sodales ipsum. Fusce tincidunt posuere dapibus.</p>
						<p>Suspendisse potenti. Nam quis magna dictum, gravida mi vitae, porttitor mi. Nullam laoreet bibendum erat vel pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer et viverra ex. Cras commodo neque sed dapibus dapibus. Cras tristique dui tincidunt dui facilisis ullamcorper. Cras id eros ac ipsum vehicula vehicula nec vel erat. Phasellus lorem nisl, maximus ac gravida at, interdum porta ex. Vestibulum mattis sem purus, porta ultricies enim placerat at.</p>
					</article>
				</div>
			</main>
        )
    }
}
