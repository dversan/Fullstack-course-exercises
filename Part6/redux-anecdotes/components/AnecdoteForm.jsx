import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (e) => {
    e.preventDefault()
    const anecdoteBody = { content: e.target.anecdoteContent.value, votes: 0 }
    e.target.anecdoteContent.value = ''

    dispatch(createAnecdote(anecdoteBody))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name={'anecdoteContent'} />
        </div>
        <button type={'submit'}>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
