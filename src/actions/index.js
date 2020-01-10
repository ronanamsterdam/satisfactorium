import actionTypes from 'statics/actions';

import squareGame from "./square-game";

const setDeviceFormFactor   = factor => ({type: actionTypes.DEVICE_FORM_FACTOR_SET, factor});
const setDeviceUserAgent    = agent => ({type: actionTypes.DEVICE_USER_AGENT_SET, agent});
const setDeviceDimensions   = dimensions => ({type: actionTypes.DEVICE_DIMENSIONS_SET, dimensions});

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
    ...squareGame,
};