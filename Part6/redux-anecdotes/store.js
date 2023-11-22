import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import notificationReducer from './reducers/notificationReducer.js'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store
