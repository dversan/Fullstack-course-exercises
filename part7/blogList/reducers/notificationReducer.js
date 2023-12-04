import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: ''
}

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

export default notificationSlice.reducer
