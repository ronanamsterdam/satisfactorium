import actionNames from 'statics/actions';

import squareGame from './square-game';
import locale from './locale';

import {THEMES}    from 'statics/strings/reducers/ux';

import * as actionTypes from './types'

const setDeviceFormFactor   = (factor: String): actionTypes.ActionSetDeviceFormFactor =>
  ({type: actionNames.DEVICE_FORM_FACTOR_SET, factor});
const setDeviceUserAgent    = (agent: String): actionTypes.ActionSetDeviceUserAgent =>
  ({type: actionNames.DEVICE_USER_AGENT_SET, agent});
const setDeviceDimensions   = (dimensions: actionTypes.Dimensions): actionTypes.ActionSetDeviceDimensions =>
  ({type: actionNames.DEVICE_DIMENSIONS_SET, dimensions});

const setTheme = (theme: String = THEMES.LIGHT): actionTypes.ActionSetTheme =>
  ({type: actionNames.SET_THEME, theme});

const appTBDAction  = () => ({type: actionNames.APP_TBD_NOTIFY_ACTION});
const appInit       = (): actionTypes.ActionAppInit => ({type: actionNames.APP_INIT});

export default {
    appTBDAction,
    appInit,
    setDeviceFormFactor,
    setDeviceUserAgent,
    setDeviceDimensions,
    setTheme,
    ...squareGame,
    ...locale,
};