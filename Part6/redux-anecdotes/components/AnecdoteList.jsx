import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { sortAnecdotes, votesIncrement } from '../reducers/anecdoteReducer.js'
import {
  resetNotificationContent,
  setNotificationContent
} from '../reducers/notificationReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)

  useEffect(() => {
    dispatch(sortAnecdotes())
  }, [anecdotes.length])

  const votingAnecdoteHandler = (anecdote) => {
    dispatch(votesIncrement(anecdote.id))
    dispatch(setNotificationContent(`You voted ${anecdote.content}`))

    setTimeout(() => dispatch(resetNotificationContent()), 5000)
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
