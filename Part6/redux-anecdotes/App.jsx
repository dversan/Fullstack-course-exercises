import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import AnecdotesFilter from './components/AnecdotesFilter.jsx'
import Notification from './components/Notification.jsx'
import { useEffect } from 'react'
import anecdotesService from './services/anecdotes.js'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
