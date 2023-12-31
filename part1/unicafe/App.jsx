import { useState } from 'react'

const History = ({ allClicks, positiveClicks }) => {
  const totalClicks = allClicks.length

  const positiveClicksPercentage = () => {
    return totalClicks === 0 ? 0 : (positiveClicks * 100) / totalClicks
  }

  const average = () => {
    const clicksValuesSum = allClicks.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    return totalClicks === 0 ? 0 : clicksValuesSum / totalClicks
  }

  return (
    <tbody>
      <tr>
        <td>all</td>
        <td>{totalClicks}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{average().toFixed(1)}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{`${positiveClicksPercentage().toFixed(1)} %`}</td>
      </tr>
    </tbody>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({ good, neutral, bad, allClicks }) => {
  const statisticsWithFeedback = (
    <table>
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <History allClicks={allClicks} positiveClicks={good} />
    </table>
  )

  return (
    <>
      <h1>statistics</h1>
      {allClicks.length === 0 ? 'No feedback given' : statisticsWithFeedback}
    </>
  )
}

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
  const [allClicks, setAllClicks] = useState([])

  const handleClicks = (clickKey) => {
    switch (clickKey) {
      case 'good':
        setAllClicks(allClicks.concat(1))
        setGood(good + 1)
        break

      case 'neutral':
        setAllClicks(allClicks.concat(0))
        setNeutral(neutral + 1)
        break

      case 'bad':
        setAllClicks(allClicks.concat(-1))
        setBad(bad + 1)
        break
    }
  }

  return (
    <>
      <h1>give feedback</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button text={'good'} handleClick={() => handleClicks('good')} />
        <Button text={'neutral'} handleClick={() => handleClicks('neutral')} />
        <Button text={'bad'} handleClick={() => handleClicks('bad')} />
      </div>
      <Statistics
        allClicks={allClicks}
        good={good}
        bad={bad}
        neutral={neutral}
      />
    </>
  )
}

export default App
