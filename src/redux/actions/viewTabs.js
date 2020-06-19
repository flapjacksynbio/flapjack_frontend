export const CREATE_TAB = 'CREATE_TAB'
export const EDIT_TAB = 'EDIT_TAB'
export const DELETE_TAB = 'DELETE_TAB'

export const createTab = (tab) => {
  return {
    type: CREATE_TAB,
    payload: tab,
  }
}

export const editTab = (tab) => {
  return {
    type: EDIT_TAB,
    payload: tab,
  }
}

export const deleteTab = (tabId) => {
  return {
    type: DELETE_TAB,
    payload: tabId,
  }
}
