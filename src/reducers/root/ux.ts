import * as actionNames from 'statics/actions';
import {UxTypes}  from 'actions/types';

import {THEMES}    from 'common/statics/theme';
import {DEVICE_FORM_FACTORS}    from 'common/statics/device';

import locale, {localeInitialState} from './locale';

export const deviceInitialState = {
    dimensions: null,
    agent:      null,
    factor:     DEVICE_FORM_FACTORS.DESKTOP,
}

export const uxInitialState = {
    theme:      THEMES.LIGHT,
    locale:     localeInitialState,
    device:     deviceInitialState,
}

const device = function(state = deviceInitialState, action: UxTypes) {
    switch(action.type) {
      case actionNames.DEVICE_USER_AGENT_SET:
          return {
              ...state,
              agent: action.agent
          }
      case actionNames.DEVICE_FORM_FACTOR_SET:
          return {
              ...state,
              factor: action.factor || DEVICE_FORM_FACTORS.DESKTOP
          }
      case actionNames.DEVICE_DIMENSIONS_SET:
          return {
              ...state,
              dimensions: action.dimensions
          }
      default:
          return state;
    }
}

export default function ux(state = uxInitialState, action: UxTypes) {
    switch(action.type) {
        case actionNames.DEVICE_DIMENSIONS_SET:
        case actionNames.DEVICE_USER_AGENT_SET:
        case actionNames.DEVICE_FORM_FACTOR_SET:
          return {
              ...state,
              device: device(state.device, action)
          }
        case actionNames.SET_THEME: {
          return {
            ...state,
            theme: action.theme
          }
        }
        case actionNames.LOCALE_SET_LOCALE: {
          return {
            ...state,
            locale: locale(state.locale, action)
          }
        }
        default:
            return state;
    }
}