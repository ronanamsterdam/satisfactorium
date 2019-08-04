import { createStore, combineReducers, compose, applyMiddleware } from "redux"

import rootReducer              from '../reducers';
import thunk                    from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import middleware               from '../middleware';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['squareGame', 'ux']
}

const squareGameConfig = {
  key: 'squareGame',
  storage: storage,
  blacklist: ['bombsBlasted', 'activeSquares', 'time', 'shouldBlast']
}

const rootCombinedWithPersist = combineReducers({
  ...rootReducer,
  squareGame: persistReducer(squareGameConfig, rootReducer.squareGame),
})

const persistedReducer = persistReducer(persistConfig, rootCombinedWithPersist)

const enhancer = compose(
  applyMiddleware(
    ...middleware,
      thunk,
  )
);

export default function configureStore(initialState) {
  const store = createStore(
      persistedReducer,
      initialState,
      enhancer
  );

  if (module.hot) {
      module.hot.accept('../reducers', () =>
          store.replaceReducer(require('../reducers').default)
      );
  }

  let persistor = persistStore(store)

  return { store, persistor };
}