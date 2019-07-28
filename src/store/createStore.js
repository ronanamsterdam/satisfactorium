import { createStore, combineReducers, compose, applyMiddleware } from "redux"

import rootReducer              from '../reducers';
import persistState             from 'redux-localstorage'
import thunk                    from 'redux-thunk';

const LOCAL_STORE_KEY = "this-key-aint-secret-v190728"

const enhancer = compose(
  //todo: it lifts the state
  //and currently we monitor entire app state
  persistState(
      ['squareGame'],
      {
          key: LOCAL_STORE_KEY
      }
  ),
  applyMiddleware(
      thunk,
      // ...middleware,
  )
);

export default function configureStore(initialState) {
  const store = createStore(
      combineReducers({
          ...rootReducer,
          // router: connectRouter(history)
      }),
      initialState,
      enhancer
  );

  if (module.hot) {
      module.hot.accept('../reducers', () =>
          store.replaceReducer(require('../reducers').default)
      );
  }

  return store;
}