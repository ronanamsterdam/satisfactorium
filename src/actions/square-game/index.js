import actionTypes from 'statics/actions';

const activate    = idx => ({ type: actionTypes.ON_SQUARE_ACTIVATE, idx });
const deactivate  = idx => ({type: actionTypes.ON_SQUARE_DEACTIVATE, idx});
const blasted     = idx => ({type: actionTypes.ON_BLAST, idx});

export default {
  activate,
  deactivate,
  blasted,
};