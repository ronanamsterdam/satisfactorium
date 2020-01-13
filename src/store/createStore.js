import { createStore, combineReducers, compose, applyMiddleware } from "redux"

import rootReducer              from '../reducers';
import thunk                    from 'redux-thunk';

import { createMigrate, persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import middleware               from '../middleware';

import migrations from './migrations';

const persistConfig = {
  key: 'root',
  version: '1',
  storage,
  blacklist: ['squareGame'],
  migrate: createMigrate(migrations, { debug: false }),
}

const squareGameConfig = {
  key: 'squareGame',
  version: '1',
  storage: storage,
  blacklist: ['bombsBlasted', 'activeSquares', 'time', 'shouldBlast']
}

const rootCombinedWithPersist = combineReducers({
  ...rootReducer,
  squareGame: persistReducer(squareGameConfig, rootReducer.squareGame),
})

const persistedReducer = persistReducer(persistConfig, rootCombinedWithPersist)

// INFO: in prod use env vars to separate dev using window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ vs prod not using it
const composeEnhancers = (typeof window !== `undefined` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
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