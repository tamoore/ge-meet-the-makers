/**
 * Facade/dispatcher for piping
 */
import { Application } from '../index';


/**
 * Vendor dependencies
 */
import React from 'react/addons';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export class Transition extends React.Component {
    constructor(){
        super();

        this.state = {
            mounted: false
        };

        this.props = {
            transitionEnter: true,
            transitionLeave: true,
            transitionAppear: true
        };
    }
    componentDidMount(){
        this.setState({ mounted: true });
    }
    render(){
        var children;

        if(!this.props.transitionAppear){
            children = this.props.children;
        }
        else{
            if(this.state.mounted){
                children = this.props.children;
            }
        }

        return(
            <ReactCSSTransitionGroup
                transitionName={this.props.transitionName}
                transitionEnter={this.props.transitionEnter}
                transitionLeave={this.props.transitionLeave}
                >
                {children}
            </ReactCSSTransitionGroup>
        )
    }
}
Transition.propTypes = {
    transitionName: React.PropTypes.string.isRequired,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool,
    transitionAppear: React.PropTypes.bool
}