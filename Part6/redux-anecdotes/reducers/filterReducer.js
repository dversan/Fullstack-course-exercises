import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      switch (action.type) {
        case 'filter/filterAnecdotes':
          return action.payload
        default:
          return state
      }
    }
  }
})

export default filterSlice.reducer
export const { filterAnecdotes } = filterSlice.actions
