import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationContent(state, action) {
      return action.payload
    },
    resetNotificationContent() {
      return initialState
    }
  }
})

export const { setNotificationContent, resetNotificationContent } =
  notificationSlice.actions

export const showNotification = (message, timeOut) => {
  return async (dispatch) => {
    dispatch(setNotificationContent(message))
    setTimeout(() => dispatch(resetNotificationContent()), timeOut)
  }
}

export default notificationSlice.reducer
