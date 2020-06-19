import { LOGOUT_CURRENT_USER } from '../actions/session'
import { CREATE_TAB, EDIT_TAB, DELETE_TAB } from '../actions/viewTabs'

const deleteTab = (state, tabId) => {
  return Object.entries(state).reduce((acc, [key, value]) => {
    if (key === tabId) return acc
    return { ...acc, [key]: value }
  })
}

const tabsReducer = (state = {}, { type, payload }) => {
  Object.freeze(state)
  switch (type) {
    case CREATE_TAB:
      return { ...state, [payload.id]: payload }
    case EDIT_TAB:
      return { ...state, [payload.id]: payload }
    case DELETE_TAB:
      return deleteTab(state, payload)
    case LOGOUT_CURRENT_USER:
      return {}
    default:
      return state
  }
}

export default tabsReducer
