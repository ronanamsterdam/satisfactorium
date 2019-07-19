import appActions from 'statics/actions';

function probabilityFactor(state = initialState) {
  return Math.exp(-(1 + Math.exp(state.lvl/10)/10))
}

const initialState = (function(state) {
  return {
    ...state,
    probabilityFactor:      probabilityFactor(state),
  }
})({
    totalSquares:           84,
    bombsBlasted:           0,
    activeSquares:          [],
    lvl:                    1,
    time:                   null,
    avgTime:                null,
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

        default:
            return state;
    }
}