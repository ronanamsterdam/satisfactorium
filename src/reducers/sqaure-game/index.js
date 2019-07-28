import appActions from 'statics/actions';

function probabilityFactor(state = initialState) {
  return Math.exp(-(1 + Math.exp(state.lvl/10)/10))
}

const initialState = (function(state) {
  return {
    ...state,
    levelSquaresDelta:      15,
    probabilityFactor:      probabilityFactor(state),
    totalSquares:           69 + 15*state.lvl,
  }
})({
    bombsBlasted:           0,
    activeSquares:          [],
    lvl:                    1,
    time:                   null,
    avgTime:                null,
    bestTimes:              {},
});

export default function squareGame(state = initialState, action) {
    switch (action.type) {

        case appActions.ON_GAME_RESET:
          return {
            ...initialState,
            activeSquares: [],
          };
        case appActions.ON_SQUARE_ACTIVATE:
            const {idx} = action;
            if(state.activeSquares.indexOf(idx) === -1) {
              state.activeSquares.push(idx);
              return {
                ...state
              }
            } else {
              return state;
            }
        case appActions.ON_SQUARE_DEACTIVATE:
            return {
              ...state,
              activeSquares: state.activeSquares.filter(x => x !== action.idx),
          };
        case appActions.ON_BLAST:
            return {
              ...state,
              bombsBlasted: state.bombsBlasted+1,
              activeSquares: state.activeSquares.filter(x => x !== action.idx),
          };

        case appActions.ON_LEVEL_DONE: {
          const {time, lvl: timeLevel} = action;

          const {bestTimes} = state

          let bestLevelTime = bestTimes[timeLevel] || time;

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

        case appActions.ON_NEXT_LEVEL:
          return {
            ...initialState,
            totalSquares:       state.totalSquares+state.levelSquaresDelta,
            activeSquares:      [],
            lvl:                ++state.lvl,
            probabilityFactor:  probabilityFactor(state),
            bestTimes:          {...state.bestTimes},
          }

        case appActions.ON_PREV_LEVEL:
            return {
              ...initialState,
              totalSquares:         Math.max(84, state.totalSquares-state.levelSquaresDelta),
              activeSquares:        [],
              lvl:                  Math.max(1, --state.lvl),
              probabilityFactor:    probabilityFactor(state),
              bestTimes:            {...state.bestTimes},
            }
        case appActions.ON_RESTART_LEVEL:
            return {
              ...initialState,
              totalSquares:         state.totalSquares,
              activeSquares:        [],
              lvl:                  state.lvl,
              probabilityFactor:    probabilityFactor(state)+Math.random()*0.0001,
              bestTimes:            {...state.bestTimes},
          }
        default:
            return state;
    }
}