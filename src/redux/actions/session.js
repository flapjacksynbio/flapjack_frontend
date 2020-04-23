export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

// TODO: Auth methods that dispatch these actions
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
})

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  }
}
