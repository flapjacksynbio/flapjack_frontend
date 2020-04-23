import { createStore, combineReducers } from 'redux'
import sessionReducer, { session } from './reducers/session'

const model = {
  session
}

const reducer = combineReducers({
  session: sessionReducer,
})

const store = createStore(reducer, model)

export default store