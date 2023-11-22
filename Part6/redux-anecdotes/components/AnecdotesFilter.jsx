import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer.js'

const AnecdotesFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const inputValue = event.target.value
    event.preventDefault()

    return inputValue !== '' ? event.target.value : 'ALL'
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input onChange={(e) => dispatch(filterAnecdotes(handleChange(e)))} />
    </div>
  )
}

export default AnecdotesFilter
