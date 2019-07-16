import * as squareGame  from "./square-game"

export const APP_TEST_ACTION        = 'APP_TEST_ACTION';
export const APP_TBD_NOTIFY_ACTION  = 'APP_TBD_NOTIFY_ACTION';
export const NONE                   = 'NONE';

export const APP_INIT               = 'APP_INIT';

export default {
    APP_TEST_ACTION,
    APP_TBD_NOTIFY_ACTION,
    APP_INIT,
    NONE,
    ...squareGame,
}

