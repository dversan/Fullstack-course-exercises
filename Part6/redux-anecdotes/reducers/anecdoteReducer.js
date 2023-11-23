import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes.js'
import {
  resetNotificationContent,
  setNotificationContent
} from './notificationReducer.js'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    votesIncrement(state, action) {
      const anecdoteId = action.payload

      const anecdoteIndex = state.findIndex(
        (anecdote) => anecdote.id === anecdoteId
      )

      state[anecdoteIndex].votes++
    },
    createNewAnecdote(state, action) {
      state.push(action.payload)
    },
    sortAnecdotes(state) {
      state.sort((a, b) => b.votes - a.votes)
    },
    applyFilterAnecdotes(state, action) {
      return state.filter((anecdote) =>
        anecdote.content.includes(action.payload)
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {
  votesIncrement,
  applyFilterAnecdotes,
  sortAnecdotes,
  createNewAnecdote,
  setAnecdotes
} = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(anecdote)

    dispatch(createNewAnecdote(newAnecdote))

    dispatch(
      setNotificationContent(
        `New anecdote ${newAnecdote.content} has been created`
      )
    )

    setTimeout(() => dispatch(resetNotificationContent()), 5000)
  }
}

export default anecdotesSlice.reducer
