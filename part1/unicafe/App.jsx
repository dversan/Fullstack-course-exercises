import { useState } from 'react'

const Button = (props) => (
  <div>
    <button onClick={props.handleClick}>{props.text}</button>
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button text={'good'} handleClick={() => setGood((n) => n + 1)} />
        <Button text={'neutral'} handleClick={() => setNeutral((n) => n + 1)} />
        <Button text={'bad'} handleClick={() => setBad((n) => n + 1)} />
      </div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </>
  )
}

export default App
