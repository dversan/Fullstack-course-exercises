import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login.js'
import blogService from '../services/blogs.js'
import { setNotificationContent } from './notificationReducer.js'

const initialState = {
  username: '',
  name: '',
  token: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const setUserData = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (exception) {
      dispatch(
        setNotificationContent({
          message: 'Wrong username or password',
          type: 'warning'
        })
      )
    }
  }
}

export default userSlice.reducer
