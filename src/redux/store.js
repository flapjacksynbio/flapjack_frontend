import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import sessionReducer, { session, sessionTransform } from './reducers/session'

const persistSessionConfig = {
  key: 'session',
  storage,
  blacklist: ['access', '_persist'],
  stateReconciler: autoMergeLevel2,
  transforms: [sessionTransform]
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['_persist', 'session'],
  stateReconciler: autoMergeLevel2
}

const model = {
  session
}

const rootReducer = combineReducers({
  session: persistReducer(persistSessionConfig, sessionReducer),
})

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(pReducer, model, devToolsEnhancer())
export const persistor = persistStore(store)

export default store
