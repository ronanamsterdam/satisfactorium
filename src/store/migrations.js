import {localeInitialState} from 'src/reducers/root/locale'

export default {
  0: (state) => {
    return {
      ...state,
    }
  },
  1: (state) => {
    return {
      ...state,
      root: {
        ...state.root,
        ux: {
          ...state.root.ux,
          locale: state.root.ux.locale || {...localeInitialState}
        }
      }
    }
  }
}