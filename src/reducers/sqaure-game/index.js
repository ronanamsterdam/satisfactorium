import actionTypes from 'statics/actions';

function probabilityFactor(state = initialState) {
  return Math.exp(-(1 + Math.exp(state.lvl/10)/10))
}

const initialState = (function(state) {
  return {
    ...state,
    levelSquaresDelta:      15,
    probabilityFactor:      probabilityFactor(state),
    totalSquares:           69 + 15*(+state.lvl),
    bombRadius:             calcBombRadius(+state.lvl),
  }
})({
    bombsBlasted:      0,
    activeSquares:     [],
    lvl:               1,
    time:              null,
    avgTime:           null,
    bestTimes:         {},
    shouldBlast:       {}
});

function calcBombRadius(lvl) {
  return Math.min(5, Math.floor((Math.exp((Math.exp(lvl/10)/11))-1)*10));
}

export default function squareGame(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ON_ADD_TO_SHOULD_BLAST: {
          return {
            ...state,
            shouldBlast: {
              ...state.shouldBlast,
              ...action.shouldBlast
            },
          };
        }

        case actionTypes.ON_GAME_RESET:
          return {
            ...initialState,
            activeSquares: [],
          };
        case actionTypes.ON_SQUARE_ACTIVATE:
            const {idx} = action;

            let newShouldBlast = state.shouldBlast
            if (newShouldBlast[action.idx]) {
              delete newShouldBlast[action.idx];
            }

            if(state.activeSquares.indexOf(idx) === -1) {
              state.activeSquares.push(idx);
            }

            return {
              ...state,
              shouldBlast: {...newShouldBlast},
            }

        case actionTypes.ON_SQUARE_DEACTIVATE:{
            const newShouldBlast = state.shouldBlast
            if (newShouldBlast[action.idx]) {
              delete newShouldBlast[action.idx];
            }
            return {
              ...state,
              activeSquares: state.activeSquares.filter(x => x !== action.idx),
              shouldBlast: {...newShouldBlast},
          };
        }
        case actionTypes.ON_BLAST:{
            let newShouldBlast = state.shouldBlast
            if (newShouldBlast[action.idx]) {
              delete newShouldBlast[action.idx];
            }
            return {
              ...state,
              bombsBlasted: state.bombsBlasted+1,
              activeSquares: state.activeSquares.filter(x => x !== action.idx),
              shouldBlast: {...newShouldBlast},
          };
        }
        case actionTypes.ON_LEVEL_DONE: {
          const {time, lvl: timeLevel} = action;

          const {bestTimes} = state

          let bestLevelTime = (bestTimes[timeLevel] && new Date(bestTimes[timeLevel])) || (time && new Date(time));

          bestLevelTime.setHours(0);
          time.setHours(0);

          if (bestLevelTime > time) {
            bestLevelTime = time
          }

          bestTimes[timeLevel] = bestLevelTime

          return {
            ...state,
            bestTimes: {...bestTimes}
          }
        }

        case actionTypes.ON_NEXT_LEVEL:
          return {
            ...initialState,
            totalSquares:       state.totalSquares+state.levelSquaresDelta,
            activeSquares:      [],
            lvl:                (+state.lvl)+1,
            probabilityFactor:  probabilityFactor(state),
            bestTimes:          {...state.bestTimes},
            bombRadius:         calcBombRadius(+state.lvl+1),
          }

        case actionTypes.ON_PREV_LEVEL:
            return {
              ...initialState,
              totalSquares:         Math.max(84, state.totalSquares-state.levelSquaresDelta),
              activeSquares:        [],
              lvl:                  Math.max(1, (+state.lvl)-1),
              probabilityFactor:    probabilityFactor(state),
              bestTimes:            {...state.bestTimes},
              bombRadius:           calcBombRadius(+state.lvl-1),
            }
        case actionTypes.ON_RESTART_LEVEL:
            return {
              ...initialState,
              totalSquares:         state.totalSquares,
              activeSquares:        [],
              lvl:                  +state.lvl,
              bombRadius:           calcBombRadius(+state.lvl),
              probabilityFactor:    probabilityFactor(state)+Math.random()*0.0001,
              bestTimes:            {...state.bestTimes},
          }

        default:
            return state;
    }
}