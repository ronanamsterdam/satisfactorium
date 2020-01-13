
import actionTypes from 'statics/actions';

import ux,  {uxInitialState}  from './ux';

const initialState = {
  ux: uxInitialState,
};

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOCALE_SET_LOCALE:
        case actionTypes.LOCALE_SET_LOADED:
        case actionTypes.SET_THEME:
        case actionTypes.DEVICE_DIMENSIONS_SET:
        case actionTypes.DEVICE_USER_AGENT_SET:
        case actionTypes.DEVICE_FORM_FACTOR_SET:
            return {
                  ...state,
                  ux: ux(state.ux, action)
              }
        default:
            return state;
    }
}