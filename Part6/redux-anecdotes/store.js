import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer.js'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer
  }
})

export default store
