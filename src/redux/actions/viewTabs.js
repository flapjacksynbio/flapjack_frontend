export const CREATE_TAB = 'CREATE_TAB'
export const EDIT_TAB = 'EDIT_TAB'
export const DELETE_TAB = 'DELETE_TAB'
export const ADD_PLOT_TO_TAB = 'ADD_PLOT_TO_TAB'

export const createTab = (tab) => ({
  type: CREATE_TAB,
  payload: tab,
})

export const editTab = (tab) => ({
  type: EDIT_TAB,
  payload: tab,
})

export const deleteTab = (tabId) => ({
  type: DELETE_TAB,
  payload: tabId,
})

export const addPlotToTab = (tabId, plotData) => ({
  type: ADD_PLOT_TO_TAB,
  payload: { tabId, plotData },
})
