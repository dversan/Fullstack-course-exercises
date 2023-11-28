import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const margin = {
    margin: 10
  }

  const selectedAnecdoteId = useParams().id

  const anecdote = anecdotes.find(
    (anecdote) => anecdote.id === selectedAnecdoteId
  )

  return (
    <>
      <div style={margin}>{anecdote.content}</div>
      <div style={margin}>{anecdote.votes}</div>
      <div style={margin}>
        For more info see {''}
        <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </>
  )
}

export default Anecdote
