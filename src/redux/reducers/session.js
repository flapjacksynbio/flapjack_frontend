/* eslint-disable indent */
import { LOGOUT_CURRENT_USER, RECEIVE_ACCESS_TOKENS, FINISHED_LOGIN } from '../actions/session'
import { createTransform } from 'redux-persist'
import api from '../../api'

export const session = {
  user: null,
  access: null,
  refresh: null,
  isLoggingIn: false,
}

const sessionReducer = (state={}, { type, payload }) => {
  Object.freeze(state)
  switch (type) {
    case RECEIVE_ACCESS_TOKENS:
      return {
        ...state,
        access: payload.access,
        refresh: payload.refresh
      }
    case LOGOUT_CURRENT_USER:
      return {
        user: null,
        access: null,
        refresh: null,
      }
    case FINISHED_LOGIN:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export const sessionTransform = createTransform(
  inbound => inbound,
  async (outbound, key) => {
    if (key === 'refresh') {
      api.refresh(outbound).catch(() => null) 
    }
    return null
  }
)

export default sessionReducer
