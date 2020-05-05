/* eslint-disable indent */
import { LOGOUT_CURRENT_USER, RECEIVE_ACCESS_TOKENS } from '../actions/session'

export const session = null

const sessionReducer = (state={}, { type, payload }) => {
  Object.freeze(state)
  switch (type) {
    case RECEIVE_ACCESS_TOKENS:
      return payload
    case LOGOUT_CURRENT_USER:
      return null
    default:
      return state
  }
}

export default sessionReducer
