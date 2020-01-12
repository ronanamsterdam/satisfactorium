import actionTypes   from 'statics/actions';

import {DEVICE_FORM_FACTORS, THEMES}    from 'statics/strings/reducers/ux';

export const deviceInitialState = {
    dimensions: null,
    agent:      null,
    factor:     DEVICE_FORM_FACTORS.DESKTOP,
}

export const uxInitialState = {
    theme: THEMES.LIGHT,
    device:     deviceInitialState,
}

const device = function(state = deviceInitialState, action) {
    switch(action.type) {
      case actionTypes.DEVICE_FORM_FACTOR_SET:
          return {
              ...state,
              factor: action.factor || DEVICE_FORM_FACTORS.DESKTOP
          }
      case actionTypes.DEVICE_USER_AGENT_SET:
          return {
              ...state,
              agent: action.agent
          }
      case actionTypes.DEVICE_DIMENSIONS_SET:
          return {
              ...state,
              dimensions: action.dimensions
          }
      default:
          return state;
    }
}

export default function ux(state = uxInitialState, action) {
    switch(action.type) {
        case actionTypes.DEVICE_DIMENSIONS_SET:
        case actionTypes.DEVICE_USER_AGENT_SET:
        case actionTypes.DEVICE_FORM_FACTOR_SET:
          return {
              ...state,
              device: device(state.device, action)
          }
        case actionTypes.SET_THEME: {
          return {
            ...state,
            theme: action.theme
          }
        }
        default:
            return state;
    }
}