import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)

  useEffect(() => {
    dispatch({ type: 'SORT' })
  }, [])

  const addVote = (id) => {
    return {
      type: 'VOTE',
      payload: { id }
    }
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
