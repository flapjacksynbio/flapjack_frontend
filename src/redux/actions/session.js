import api from '../../api'

export const RECEIVE_ACCESS_TOKENS = 'RECEIVE_ACCESS_TOKENS'
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const FINISHED_LOGIN = 'FINISHED_LOGIN'

export const receiveAccessTokens = (tokens) => {
  setTimeout(() => api.refresh().catch(() => null), 4.5 * 60 * 1000) // Cada 4.5 minutos

  return {
    type: RECEIVE_ACCESS_TOKENS,
    payload: tokens,
  }
}

export const setUserInfo = ({ username, email }) => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: { username, email },
  }
}

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER,
  }
}

export const loggingIn = (isLoggingIn) => ({
  type: FINISHED_LOGIN,
  payload: { isLoggingIn },
})
