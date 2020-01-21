
import actionNames from 'statics/actions';

import ux,  {uxInitialState}  from './ux';

const initialState = {
  ux: uxInitialState,
};

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case actionNames.LOCALE_SET_LOCALE:
        case actionNames.LOCALE_SET_LOADED:
        case actionNames.SET_THEME:
        case actionNames.DEVICE_DIMENSIONS_SET:
        case actionNames.DEVICE_USER_AGENT_SET:
        case actionNames.DEVICE_FORM_FACTOR_SET:
            return {
                  ...state,
                  ux: ux(state.ux, action)
              }
        default:
            return state;
    }
}