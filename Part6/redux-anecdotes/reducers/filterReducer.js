import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = 'ALL'

const applyFilter = createAction('SET_FILTER')

const filterReducer = createReducer(initialState, (builder) => {
  builder.addCase(applyFilter, (state, action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
  })
})

export default filterReducer
