import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes.js'
import { useContext } from 'react'
import AnecdotesContext from '../AnecdotesContext.jsx'

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
    event.target.anecdoteContent.value = ''
    await newAnecdoteMutation.mutate(anecdoteBody)
    notificationDispatch({ type: 'create', payload: anecdoteBody.content })
    setTimeout(() => notificationDispatch({ type: 'reset' }), 5000)
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
