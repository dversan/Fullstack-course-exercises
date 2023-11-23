import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer.js'
import {
  resetNotificationContent,
  setNotificationContent
} from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdoteContent.value
    e.target.anecdoteContent.value = ''

    dispatch(createNewAnecdote(anecdoteContent))
    dispatch(
      setNotificationContent(`New anecdote ${anecdoteContent} has been created`)
    )

    setTimeout(() => dispatch(resetNotificationContent()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name={'anecdoteContent'} />
        </div>
        <button type={'submit'}>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
