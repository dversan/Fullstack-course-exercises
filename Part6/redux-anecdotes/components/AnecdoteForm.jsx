import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes.js'
import { useContext } from 'react'
import AnecdotesContext from '../AnecdotesContext.jsx'
import { showNotificationHandler } from '../helpers/notificationHelpers.jsx'

const AnecdoteForm = () => {
  const [_, notificationDispatch] = useContext(AnecdotesContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteBody = {
      content: event.target.anecdoteContent.value,
      votes: 0
    }

    if (anecdoteBody.content.length < 5) {
      showNotificationHandler(
        'error',
        'too short anecdote, must have length 5 or more ',
        5000,
        notificationDispatch
      )
    } else {
      event.target.anecdoteContent.value = ''
      await newAnecdoteMutation.mutate(anecdoteBody)
      showNotificationHandler(
        'create',
        `New anecdote ${anecdoteBody.content} has been created`,
        5000,
        notificationDispatch
      )
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name={'anecdoteContent'} />
        </div>
        <button type={'submit'}>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
