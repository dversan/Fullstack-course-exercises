import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdoteContent.value
    e.target.anecdoteContent.value = ''

    return {
      type: 'ANECDOTE',
      payload: { content: anecdoteContent }
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          dispatch(createAnecdote(e))
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
