
import actionTypes from 'statics/actions';

import ux,  {uxInitialState}  from './ux';

const initialState = {
  ux: uxInitialState,
};

export default function testReducer(state = initialState, action) {
    switch (action.type) {
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