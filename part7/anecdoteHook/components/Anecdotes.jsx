import { Link } from 'react-router-dom'
import About from './About.jsx'

const Anecdotes = ({ anecdotes, notification }) => {
  return (
    <div>
      {notification}
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
      <About />
    </div>
  )
}

export default Anecdotes
