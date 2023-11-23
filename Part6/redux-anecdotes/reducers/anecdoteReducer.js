import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes.js'
import { showNotification } from './notificationReducer.js'

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
      showNotification(
        `New anecdote ${newAnecdote.content} has been created`,
        5000
      )
    )
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdotesService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })

    dispatch(votesIncrement(anecdote.id))

    dispatch(showNotification(`You voted ${anecdote.content}`, 5000))
  }
}

export default anecdotesSlice.reducer
