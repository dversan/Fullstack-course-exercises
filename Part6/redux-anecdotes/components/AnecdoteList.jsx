import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
  applyFilterAnecdotes,
  sortAnecdotes,
  votesIncrement
} from '../reducers/anecdoteReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    dispatch(sortAnecdotes())
  }, [])

  useEffect(() => {
    dispatch(applyFilterAnecdotes(filter))
  }, [filter])

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(votesIncrement(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
