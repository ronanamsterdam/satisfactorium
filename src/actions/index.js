import actionTypes from 'statics/actions';

import squareGame from "./square-game";

const appTestAction = val => ({ type: actionTypes.APP_TEST_ACTION, val });

const appTBDAction  = _ => ({type: actionTypes.APP_TBD_NOTIFY_ACTION});
const appInit       = _ => ({type: actionTypes.APP_INIT});

export default {
    appTestAction,
    appTBDAction,
    appInit,
    ...squareGame,
};