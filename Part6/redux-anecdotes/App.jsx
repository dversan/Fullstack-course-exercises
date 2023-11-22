import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import AnecdotesFilter from './components/AnecdotesFilter.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
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
