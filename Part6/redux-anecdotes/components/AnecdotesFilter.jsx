import { useDispatch } from 'react-redux'
import { applyFilterAnecdotes } from '../reducers/anecdoteReducer'

const AnecdotesFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const inputValue = event.target.value
    event.preventDefault()
    dispatch(
      applyFilterAnecdotes(inputValue !== '' ? event.target.value : 'ALL')
    )
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input onChange={handleChange} />
    </div>
  )
}

export default AnecdotesFilter
