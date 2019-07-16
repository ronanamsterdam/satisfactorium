import actionTypes from 'statics/actions';

const squareActivate    = idx => ({ type: actionTypes.ON_SQUARE_ACTIVATE, idx });
const squareDeactivate  = idx => ({type: actionTypes.ON_SQUARE_DEACTIVATE, idx});
const squareBlast    = idx => ({type: actionTypes.ON_BLAST, idx});

export default {
  squareActivate,
  squareDeactivate,
  squareBlast,
};