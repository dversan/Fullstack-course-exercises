import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer.js'
import notificationReducer from './reducers/notificationReducer.js'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer
  }
})

export default store
