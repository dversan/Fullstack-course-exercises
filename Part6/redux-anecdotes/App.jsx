import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import AnecdotesFilter from './components/AnecdotesFilter.jsx'
import Notification from './components/Notification.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {
  const {
    isPending,
    isError,
    data: anecdotes,
    error
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () =>
      axios.get('http://localhost:3001/anecdotes').then((res) => res.data),
    retry: 1
  })

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesFilter />
      <AnecdoteList anecdotes={anecdotes.sort((a, b) => b.votes - a.votes)} />
      <AnecdoteForm />
    </div>
  )
}

export default App
