import appActions   from 'statics/actions';
import actions      from '../actions';

const debounce = require('../utils').debounceCl();

const calcNextIdx = function({dispatch, gameGrid, vector, radius = 0, idx}) {
  const {gameWidth, squareSize, columnsCount, rowsCount} = gameGrid;

  const idxRow = Math.ceil((idx+1)/columnsCount);
  const idxColumn = (idx+1)%columnsCount != 0 ? (idx+1)%columnsCount : columnsCount;

  const idxL = idx > (idxRow-1)*columnsCount && vector !== "right" ? idx - 1 : null;
  const idxR = idx < idxRow*columnsCount - 1 && vector !== "left" ? idx + 1 : null;
  const idxU = idxRow != 1 && vector !== "down" ? columnsCount*(idxRow - 1) - (columnsCount-idxColumn) - 1 : null;
  const idxD = idxRow != rowsCount && vector !== "up" ? columnsCount*(idxRow + 1) - (columnsCount-idxColumn) - 1 : null;

  // console.table({idx, idxRow, idxColumn, vector, radius});
  // console.table({idx, idxL, idxR, idxU, idxD});

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

  const {offsetWidth} = document.getElementById("stats-square");
  const squareSize = offsetWidth + 5; //+5px for around margin

  const gameWidth = width - scenePadding;
  const columnsCount = Math.floor(gameWidth/squareSize);
  const rowsCount = Math.ceil(totalSquares/columnsCount);

  // console.table({gameWidth, squareSize,grid: `${columnsCount}x${rowsCount}`})

  return {gameWidth, squareSize, columnsCount, rowsCount}
}

export default store => next => action => {
    // console.log("MW ACTION!!", action.idx)

        const state = store.getState();
        const dispatch      = store.dispatch;

        console.log(state.squareGame.bombRadius);

        switch(action.type) {
            case appActions.ON_SQUARE_ACTIVATE:
            case appActions.ON_SQUARE_DEACTIVATE: {
              // console.log("DEACTIVE:", action.idx)
              break;
            }
            case appActions.ON_BLAST: {
              // check if it's in shouldBlast
              if(state.squareGame.ux.device.dimensions &&
                !state.squareGame.shouldBlast[action.idx]) {
                // console.log("BLAST:", action.idx)
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