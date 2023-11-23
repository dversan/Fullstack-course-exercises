import { createSlice } from '@reduxjs/toolkit'

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

export default anecdotesSlice.reducer
export const {
  votesIncrement,
  applyFilterAnecdotes,
  sortAnecdotes,
  createNewAnecdote,
  setAnecdotes
} = anecdotesSlice.actions
