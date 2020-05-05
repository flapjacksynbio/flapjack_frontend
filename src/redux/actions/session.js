export const RECEIVE_ACCESS_TOKENS = 'RECEIVE_ACCESS_TOKENS'
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

export const receiveAccessTokens = tokens => ({
  type: RECEIVE_ACCESS_TOKENS,
  payload: tokens,
})

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  }
}
