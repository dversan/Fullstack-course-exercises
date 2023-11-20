import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const incrementGood = createAction('GOOD')
const incrementOk = createAction('OK')
const incrementBad = createAction('BAD')
const reset = createAction('ZERO')

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementGood, (state, action) => {
      state.good++
    })
    .addCase(incrementOk, (state, action) => {
      state.ok++
    })
    .addCase(incrementBad, (state, action) => {
      state.bad++
    })
    .addCase(reset, (state, action) => {
      state.good = 0
      state.bad = 0
      state.ok = 0
    })
})

export default counterReducer
