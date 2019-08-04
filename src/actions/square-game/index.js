import appActions from 'statics/actions';

const squareActivate    = idx => ({ type: appActions.ON_SQUARE_ACTIVATE, idx });
const squareDeactivate  = idx => ({type: appActions.ON_SQUARE_DEACTIVATE, idx});
const squareBlast    = idx => ({type: appActions.ON_BLAST, idx});
const squareGameReset    = idx => ({type: appActions.ON_GAME_RESET, idx});
const levelDone = args => ({type: appActions.ON_LEVEL_DONE, ...args});
const nextLevel = _ => ({type: appActions.ON_NEXT_LEVEL});
const prevLevel = _ => ({type: appActions.ON_PREV_LEVEL});
const restartLevel = _ => ({type: appActions.ON_RESTART_LEVEL});

const setDeviceFormFactor   = factor => ({type: appActions.DEVICE_FORM_FACTOR_SET, factor});
const setDeviceUserAgent    = agent => ({type: appActions.DEVICE_USER_AGENT_SET, agent});
const setDeviceDimensions   = dimensions => ({type: appActions.DEVICE_DIMENSIONS_SET, dimensions});

const addToShouldBlast = (shouldBlast = {}) => ({type: appActions.ON_ADD_TO_SHOULD_BLAST, shouldBlast})

export default {
  squareActivate,
  squareDeactivate,
  squareBlast,
  squareGameReset,
  levelDone,
  prevLevel,
  nextLevel,
  restartLevel,
  setDeviceFormFactor,
  setDeviceUserAgent,
  setDeviceDimensions,
  addToShouldBlast,
};