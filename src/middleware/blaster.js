import { put, select, takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';

import appActions   from 'statics/actions';
import actions      from '../actions';

const calcNextIdx = function({dispatch, gameGrid, vector, radius = 0, idx}) {
  const {columnsCount, rowsCount} = gameGrid;

  const idxRow = Math.ceil((idx+1)/columnsCount);
  const idxColumn = (idx+1)%columnsCount !== 0 ? (idx+1)%columnsCount : columnsCount;

  // TODO: refact left | up | etc to consts
  const idxL = idx > (idxRow-1)*columnsCount && vector !== "right" ? idx - 1 : null;
  const idxR = idx < idxRow*columnsCount - 1 && vector !== "left" ? idx + 1 : null;
  const idxU = idxRow !== 1 && vector !== "down" ? columnsCount*(idxRow - 1) - (columnsCount-idxColumn) - 1 : null;
  const idxD = idxRow !== rowsCount && vector !== "up" ? columnsCount*(idxRow + 1) - (columnsCount-idxColumn) - 1 : null;

  radius--;

  const shouldBlastObj = {}
  idxL && (shouldBlastObj[idxL] = {vector: "left", radius})
  idxR && (shouldBlastObj[idxR] = {vector: "right", radius})
  idxU && (shouldBlastObj[idxU] = {vector: "up", radius})
  idxD && (shouldBlastObj[idxD] = {vector: "down", radius})

  dispatch(actions.addToShouldBlast(shouldBlastObj))

  if (radius > 0) {
    idxL && calcNextIdx({dispatch, gameGrid, vector: "left", radius, idx: idxL});
    idxR && calcNextIdx({dispatch, gameGrid, vector: "right", radius, idx: idxR});
    idxU && calcNextIdx({dispatch, gameGrid, vector: "up", radius, idx: idxU});
    idxD && calcNextIdx({dispatch, gameGrid, vector: "down", radius, idx: idxD});
  }

  return shouldBlastObj
}

const calcNextIdxGen = function*({gameGrid, vector, radius = 0, idx}) {
  const {columnsCount, rowsCount} = gameGrid;

  const idxRow = Math.ceil((idx+1)/columnsCount);
  const idxColumn = (idx+1)%columnsCount !== 0 ? (idx+1)%columnsCount : columnsCount;

  // TODO: refact left | up | etc to consts
  const idxL = idx > (idxRow-1)*columnsCount && vector !== "right" ? idx - 1 : null;
  const idxR = idx < idxRow*columnsCount - 1 && vector !== "left" ? idx + 1 : null;
  const idxU = idxRow !== 1 && vector !== "down" ? columnsCount*(idxRow - 1) - (columnsCount-idxColumn) - 1 : null;
  const idxD = idxRow !== rowsCount && vector !== "up" ? columnsCount*(idxRow + 1) - (columnsCount-idxColumn) - 1 : null;

  radius--;

  const shouldBlastObj = {}
  idxL && (shouldBlastObj[idxL] = {vector: "left", radius})
  idxR && (shouldBlastObj[idxR] = {vector: "right", radius})
  idxU && (shouldBlastObj[idxU] = {vector: "up", radius})
  idxD && (shouldBlastObj[idxD] = {vector: "down", radius})

  yield put(actions.addToShouldBlast(shouldBlastObj))
  console.log(radius)

  if (radius > 0) {
    idxL && calcNextIdxGen({gameGrid, vector: "left", radius, idx: idxL});
    idxR && calcNextIdxGen({gameGrid, vector: "right", radius, idx: idxR});
    idxU && calcNextIdxGen({gameGrid, vector: "up", radius, idx: idxU});
    idxD && calcNextIdxGen({gameGrid, vector: "down", radius, idx: idxD});
  }
}

const calcTheGrid = function(totalSquares) {
  let pixelRatio = 1;

  if (navigator.userAgent.toLowerCase().indexOf('apple') > -1) {
    pixelRatio = (window.outerWidth - 8) / window.innerWidth;
  } else {
    // apparently only Chrome has issues on zoom levels bellow 70%
    pixelRatio = window.devicePixelRatio/2;
  }

  const {offsetWidth} = document.getElementById("stats-square");
  const squareSize = (offsetWidth + 5) * pixelRatio; //+5px for around margin

  const {offsetWidth: sceneWidth} = document.getElementById("square-game-scene");

  const gameWidth = (sceneWidth) * pixelRatio;
  const columnsCount = Math.floor(gameWidth/squareSize);
  const rowsCount = Math.ceil(totalSquares/columnsCount);

  return {gameWidth, squareSize, columnsCount, rowsCount}
}

function* sagaGrid(action) {
  try {
    // INFO: this right here proves that saga is way slower than thunk
    // well at least the select method.
    // comparing to thunk's store.getState() saga's select is not giving the very latest sate of the store
    // just run the blast game and compare console logs
    // thunks getSate() will always give the most current up to date state
    // while saga's select will give a state before
    const store = yield select() //this should imitate getStore()
    const shouldBlast = store.squareGame.shouldBlast
    const shouldItemBlast = store.squareGame.shouldBlast[action.idx]

    console.log(`ON SAGA: ${action.idx} ::: ${Date.now()}`)
    console.log(shouldBlast)

    if(!shouldItemBlast) {
      const totalSquares = yield select((state) => state.squareGame.totalSquares)
      const radius = yield select((state) => state.squareGame.bombRadius)

      const gameGrid = calcTheGrid(totalSquares)
      // INFO: uncomment if you want saga gen to be executed, but then comment out the thunks blast promise bellow
      // yield calcNextIdxGen({gameGrid, idx: action.idx, radius});
    }

  } catch (e) {
    console.error(e);
    //  yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

export function* sagaGridMw() {
  yield takeEvery(appActions.ON_BLAST, sagaGrid);
}

export default store => next => action => {

        const state = store.getState();
        const dispatch      = store.dispatch;

        switch(action.type) {
            case appActions.ON_SQUARE_ACTIVATE:
            case appActions.ON_SQUARE_DEACTIVATE: {
              break;
            }
            case appActions.ON_BLAST: {
              console.log(`ON THUNK: ${action.idx} ::: ${Date.now()}`)
              console.log(state.squareGame.shouldBlast)
              if(!state.squareGame.shouldBlast[action.idx]) {
                Promise.resolve().then(_ => {
                  const {squareGame:{
                    totalSquares,
                  }} = store.getState();

                  const gameGrid = calcTheGrid(totalSquares)
                  calcNextIdx({dispatch, gameGrid, idx: action.idx, radius: state.squareGame.bombRadius});
                });
              }

              break;
             }
             default: {
               break;
             }
        }


    return next(action);
};