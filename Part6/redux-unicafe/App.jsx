import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>
      <div>good {useSelector((state) => state.good)}</div>
      <div>ok {useSelector((state) => state.ok)}</div>
      <div>bad {useSelector((state) => state.bad)}</div>
    </div>
  )
}

export default App
