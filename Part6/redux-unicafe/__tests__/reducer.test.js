import deepFreeze from 'deep-freeze'
import counterReducer from '../reducers/reducer.js'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    const action = {
      type: 'GOOD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('state is restarted when action type ZERO is dispatched', () => {
    const updatedState = { good: 2, ok: 3, bad: 5 }

    const resetCounter = {
      type: 'ZERO'
    }

    const resettledState = counterReducer(updatedState, resetCounter)

    expect(resettledState).toEqual(initialState)
  })
})
