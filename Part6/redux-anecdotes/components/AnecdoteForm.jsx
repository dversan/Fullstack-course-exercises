import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdoteContent.value
    e.target.anecdoteContent.value = ''

    dispatch(createNewAnecdote(anecdoteContent))
  }

  return (
    <>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          createAnecdote(e)
        }}
      >
        <div>
          <input name={'anecdoteContent'} />
        </div>
        <button type={'submit'}>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
