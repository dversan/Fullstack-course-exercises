import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <div>
    <button onClick={handleClick}>{text}</button>
  </div>
)

const AnecdoteOfTheDaySection = ({
  anecdotes,
  selected,
  votes,
  selectAnecdoteHandler,
  voteAnecdoteHandler
}) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>{`Has ${votes[selected]} votes.`}</div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <Button handleClick={voteAnecdoteHandler} text={'vote'} />
        <Button handleClick={selectAnecdoteHandler} text={'next anecdote'} />
      </div>
    </>
  )
}

const MostVotedAnecdoteSection = ({ anecdotes, votes }) => {
  const maxNumberOfVotes = Math.max(...votes)

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[votes.indexOf(maxNumberOfVotes)]}</div>
      <div>{`Has ${maxNumberOfVotes} votes.`}</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selectedAnecdote, setSelectedAnecdote] = useState(0)
  const [votes, setVotes] = useState(
    new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
  )

  const votesSum = votes.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )

  const selectAnecdoteHandler = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)

    setSelectedAnecdote(randomNumber)
  }

  const voteAnecdoteHandler = () => {
    const votesListCopy = [...votes]
    votesListCopy[selectedAnecdote] += 1

    setVotes(votesListCopy)
  }

  return (
    <>
      <AnecdoteOfTheDaySection
        anecdotes={anecdotes}
        votes={votes}
        selected={selectedAnecdote}
        selectAnecdoteHandler={() => selectAnecdoteHandler()}
        voteAnecdoteHandler={() => voteAnecdoteHandler()}
      />
      {votesSum === 0 ? '' : <MostVotedAnecdoteSection votes={votes} anecdotes={anecdotes} /> }
    </>
  )
}

export default App
