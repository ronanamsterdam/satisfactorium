import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

import createStore from "./src/store/createStore"

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const {store, persistor} = createStore()
  return <Provider store={store}><PersistGate loading={null} persistor={persistor}>{element}</PersistGate></Provider>
}