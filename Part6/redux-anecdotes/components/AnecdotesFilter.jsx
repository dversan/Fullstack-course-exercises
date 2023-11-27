import { useDispatch } from 'react-redux'
import {
  applyFilterAnecdotes,
  initializeAnecdotes
} from '../reducers/anecdoteReducer'

const AnecdotesFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const inputValue = event.target.value
    event.preventDefault()
    if (inputValue) {
      dispatch(applyFilterAnecdotes(event.target.value))
    } else {
      dispatch(initializeAnecdotes())
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
