// non ui component to gather and react to client device's specifics
import  { Component } from 'react';
// import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import AppActions               from '../../../../actions';

const debounce = require('../../../../utils').debounceCl();
// const coreStyleVars = require("!less-vars-loader?camelCase!style/variables.less");

class Device extends Component {
    componentWillMount() {
        this.__setAgent();
        this.__setDimensions();
        this.__setListeners();
    }

    componentWillUnmount() {
        this.__removeListeners();
    }

    __setListeners = () => {
        window.addEventListener('resize', this.onResize)
    }

    __removeListeners = () => {
        window.removeEventListener('resize', this.onResize);
    }

    onResize = e => debounce(()=>this.__onResize(e),300)

    __onResize = e => this.__setDimensions(e)

    __setAgent = () => {
        const agent = navigator.userAgent;
        this.props.actions.setDeviceUserAgent(agent);
    }

    __setDimensions = () => {
        // const agent = navigator.userAgent;

        const {innerHeight, innerWidth, outerWidth, outerHeight} = window;

        // const tabletBreak = parseInt(coreStyleVars.tabletBreak);
        // const mobileBreak = parseInt(coreStyleVars.mobileBreak);

        // let factor = DEVICE_FORM_FACTORS.DESKTOP

        console.table({innerHeight, innerWidth});

        // if (innerWidth <= mobileBreak) {
        //     factor = DEVICE_FORM_FACTORS.MOBILE;
        // } else if (innerWidth <= tabletBreak) {
        //     factor = DEVICE_FORM_FACTORS.TABLET;
        // }

        // this.props.actions.setDeviceFormFactor(factor);

        this.props.actions.setDeviceDimensions({
            height:         innerHeight,
            width:          innerWidth,
            outerHeight,
            outerWidth,
        });
    }

    render = () => null
}

const mapState = (state) => ({});

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(null, mapDispatch)(Device)