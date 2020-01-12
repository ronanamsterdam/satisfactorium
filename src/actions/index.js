import actionTypes from 'statics/actions';

import squareGame from "./square-game";

import {THEMES}    from 'statics/strings/reducers/ux';

const setDeviceFormFactor   = factor => ({type: actionTypes.DEVICE_FORM_FACTOR_SET, factor});
const setDeviceUserAgent    = agent => ({type: actionTypes.DEVICE_USER_AGENT_SET, agent});
const setDeviceDimensions   = dimensions => ({type: actionTypes.DEVICE_DIMENSIONS_SET, dimensions});

const setTheme = (theme = THEMES.LIGHT) => ({type: actionTypes.SET_THEME, theme});

const appTestAction = val => ({ type: actionTypes.APP_TEST_ACTION, val });

const appTBDAction  = _ => ({type: actionTypes.APP_TBD_NOTIFY_ACTION});
const appInit       = _ => ({type: actionTypes.APP_INIT});

export default {
    appTestAction,
    appTBDAction,
    appInit,
    setDeviceFormFactor,
    setDeviceUserAgent,
    setDeviceDimensions,
    setTheme,
    ...squareGame,
};