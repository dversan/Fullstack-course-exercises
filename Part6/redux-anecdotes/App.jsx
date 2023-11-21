import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm.jsx'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

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
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  )
}

export default App
