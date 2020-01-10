import actionTypes from 'statics/actions';

const squareActivate    = idx => ({ type: actionTypes.ON_SQUARE_ACTIVATE, idx });
const squareDeactivate  = idx => ({type: actionTypes.ON_SQUARE_DEACTIVATE, idx});
const squareBlast    = idx => ({type: actionTypes.ON_BLAST, idx});
const squareGameReset    = idx => ({type: actionTypes.ON_GAME_RESET, idx});
const levelDone = args => ({type: actionTypes.ON_LEVEL_DONE, ...args});
const nextLevel = _ => ({type: actionTypes.ON_NEXT_LEVEL});
const prevLevel = _ => ({type: actionTypes.ON_PREV_LEVEL});
const restartLevel = _ => ({type: actionTypes.ON_RESTART_LEVEL});

const addToShouldBlast = (shouldBlast = {}) => ({type: actionTypes.ON_ADD_TO_SHOULD_BLAST, shouldBlast})

export default {
  squareActivate,
  squareDeactivate,
  squareBlast,
  squareGameReset,
  levelDone,
  prevLevel,
  nextLevel,
  restartLevel,
  addToShouldBlast,
};