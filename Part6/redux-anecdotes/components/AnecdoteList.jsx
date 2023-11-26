import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes.js'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()

  const updatedAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id
            ? {
                ...anecdote,
                votes: anecdote.votes + 1,
                content: anecdote.content
              }
            : anecdote
        )
      )
    }
  })

  const votingAnecdoteHandler = (anecdote) => {
    const anecdoteId = anecdote.id
    updatedAnecdoteMutation.mutate(anecdoteId, anecdote)
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
