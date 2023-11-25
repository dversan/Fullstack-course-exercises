import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes.js'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
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
    newNoteMutation.mutate(anecdoteBody)
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
