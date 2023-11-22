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

export default notificationSlice.reducer
export const { setNotificationContent, resetNotificationContent } =
  notificationSlice.actions
