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
}

const calcTheGrid = function(store) {
  const {squareGame:{
    totalSquares,
    ux:{device:{dimensions:{width}}}}} = store.getState();

  const scenePadding = (18+30)*2; //css margins around the gamegrid

  let pixelRatio = 1;

  if (navigator.userAgent.toLowerCase().indexOf('apple') > -1) {
    pixelRatio = (window.outerWidth - 8) / window.innerWidth;
  } else {
    // apparently only Chrome has issues on zoom levels bellow 70%
    pixelRatio = window.devicePixelRatio/2;
  }

  const {offsetWidth} = document.getElementById("stats-square");
  const squareSize = (offsetWidth + 5) * pixelRatio; //+5px for around margin

  const gameWidth = (width - scenePadding) * pixelRatio;
  const columnsCount = Math.floor(gameWidth/squareSize);
  const rowsCount = Math.ceil(totalSquares/columnsCount);

  return {gameWidth, squareSize, columnsCount, rowsCount}
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
              if(state.squareGame.ux.device.dimensions &&
                !state.squareGame.shouldBlast[action.idx]) {
                Promise.resolve().then(_ => {
                  const gameGrid = calcTheGrid(store)
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