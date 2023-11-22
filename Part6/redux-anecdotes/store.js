import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'

const store = configureStore({
  reducer: { anecdotes: anecdotesReducer, filter: filterReducer }
})

export default store
