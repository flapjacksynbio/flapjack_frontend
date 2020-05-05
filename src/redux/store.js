import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import sessionReducer, { session } from './reducers/session'

const model = {
  session
}

const reducer = combineReducers({
  session: sessionReducer,
})

const store = createStore(reducer, model, devToolsEnhancer())

export default store