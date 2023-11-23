import { useDispatch, useSelector } from 'react-redux'
import { applyFilterAnecdotes, setAnecdotes } from '../reducers/anecdoteReducer'
import serviceAnecdotes from '../services/anecdotes.js'

const AnecdotesFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const inputValue = event.target.value
    event.preventDefault()
    if (inputValue) {
      dispatch(applyFilterAnecdotes(event.target.value))
    } else {
      serviceAnecdotes
        .getAll()
        .then((anecdotesInDb) => dispatch(setAnecdotes(anecdotesInDb)))
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input onChange={handleChange} />
    </div>
  )
}

export default AnecdotesFilter
