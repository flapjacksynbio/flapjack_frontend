/* eslint-disable indent */
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session'

export const session = { username: 'MrEarle' }

const sessionReducer = (state={}, { type, payload }) => {
  Object.freeze(state)
  switch (type) {
    case RECEIVE_CURRENT_USER:
      return payload
    case LOGOUT_CURRENT_USER:
      return null
    default:
      return state
  }
}

export default sessionReducer
