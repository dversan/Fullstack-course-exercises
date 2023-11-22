import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    votesIncrement(state, action) {
      const anecdoteId = action.payload

      const anecdoteIndex = state.findIndex(
        (anecdote) => anecdote.id === anecdoteId
      )

      state[anecdoteIndex].votes++
    },
    createNewAnecdote(state, action) {
      const anecdoteContent = action.payload

      const newAnecdote = asObject(anecdoteContent)

      state.push(newAnecdote)
    },
    sortAnecdotes(state) {
      state.sort((a, b) => b.votes - a.votes)
    },
    applyFilterAnecdotes(state, action) {
      if (action.payload === 'ALL') {
        return initialState
      } else {
        return state.filter((anecdote) =>
          anecdote.content.includes(action.payload)
        )
      }
    }
  }
})

export default anecdotesSlice.reducer
export const {
  votesIncrement,
  applyFilterAnecdotes,
  sortAnecdotes,
  createNewAnecdote
} = anecdotesSlice.actions
