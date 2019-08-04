import appActions   from 'statics/actions';

import {DEVICE_FORM_FACTORS}    from 'statics/strings/reducers/ux';

export const deviceInitialState = {
    dimensions: null,
    agent:      null,
    factor:     DEVICE_FORM_FACTORS.DESKTOP,
}

export const uxInitialState = {
    device:     deviceInitialState,
}

const device = function(state = deviceInitialState, action) {
    switch(action.type) {
        case appActions.DEVICE_FORM_FACTOR_SET:
            return {
                ...state,
                factor: action.factor || DEVICE_FORM_FACTORS.DESKTOP
            }
        case appActions.DEVICE_USER_AGENT:
            return {
                ...state,
                agent: action.agent
            }
        case appActions.DEVICE_DIMENSIONS_SET:
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
        case appActions.DEVICE_DIMENSIONS_SET:
        case appActions.DEVICE_USER_AGENT_SET:
        case appActions.DEVICE_FORM_FACTOR_SET:
            return {
                ...state,
                device: device(state.device, action)
            }
        default:
            return state;
    }
}