import * as squareGame  from "./square-game"

export const APP_TEST_ACTION        = 'APP_TEST_ACTION';
export const APP_TBD_NOTIFY_ACTION  = 'APP_TBD_NOTIFY_ACTION';
export const NONE                   = 'NONE';

export const APP_INIT               = 'APP_INIT';

export const DEVICE_FORM_FACTOR_SET   = 'DEVICE_FORM_FACTOR_SET';
export const DEVICE_USER_AGENT_SET    = 'DEVICE_USER_AGENT_SET';
export const DEVICE_DIMENSIONS_SET    = 'DEVICE_DIMENSIONS_SET';

export default {
    APP_TEST_ACTION,
    APP_TBD_NOTIFY_ACTION,
    APP_INIT,
    NONE,
    DEVICE_FORM_FACTOR_SET,
    DEVICE_USER_AGENT_SET,
    DEVICE_DIMENSIONS_SET,
    ...squareGame,
}

