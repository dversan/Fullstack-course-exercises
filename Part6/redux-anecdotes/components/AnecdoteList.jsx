import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { sortAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)

  useEffect(() => {
    dispatch(sortAnecdotes())
  }, [anecdotes.length])

  const votingAnecdoteHandler = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votingAnecdoteHandler(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
