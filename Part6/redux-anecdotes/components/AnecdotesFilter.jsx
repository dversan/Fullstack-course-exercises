import { useDispatch } from 'react-redux'

const AnecdotesFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const inputValue = event.target.value

    event.preventDefault()

    return {
      type: 'SET_FILTER',
      payload: inputValue !== '' ? event.target.value : 'ALL'
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={(e) => dispatch(handleChange(e))} />
    </div>
  )
}

export default AnecdotesFilter
