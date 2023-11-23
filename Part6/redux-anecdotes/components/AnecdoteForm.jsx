import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer.js'
import {
  resetNotificationContent,
  setNotificationContent
} from '../reducers/notificationReducer.js'
import anecdotesService from '../services/anecdotes.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (e) => {
    e.preventDefault()
    const anecdoteBody = { content: e.target.anecdoteContent.value, votes: 0 }
    e.target.anecdoteContent.value = ''

    anecdotesService
      .create(anecdoteBody)
      .then((anecdote) => dispatch(createNewAnecdote(anecdote)))

    dispatch(
      setNotificationContent(
        `New anecdote ${anecdoteBody.content} has been created`
      )
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
