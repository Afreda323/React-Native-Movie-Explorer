import { createStore } from 'redux'
import { persistStore, persistCombineReducers, PURGE } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import reducers from '../reducers'
const config = {
  storage,
  key: 'key'
}

const reducer = persistCombineReducers(config, reducers)

export default function configureStore () {
  let store = createStore(reducer)
  let persistor = persistStore(store)

  return { persistor, store }
}
