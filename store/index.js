import { createStore } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import reducers from '../reducers'

const config = {
  storage,
}

const reducer = persistCombineReducers(config, reducers)

export default function configureStore () {
  let store = createStore(reducer)
  let persistor = persistStore(store)

  return { persistor, store }
}
