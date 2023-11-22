import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import AnecdotesFilter from './components/AnecdotesFilter.jsx'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
