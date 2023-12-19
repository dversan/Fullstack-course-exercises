import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Authors from './components/Authors.jsx'
import Books from './components/Books.jsx'
import NewBook from './components/NewBook.jsx'
import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
      id
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author
      published
      id
    }
  }
`

const App = () => {
  const { data: authorsData, loading: authorsLoading } = useQuery(ALL_AUTHORS)
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: {}
  })

  if (authorsLoading || booksLoading) {
    return <div>loading...</div>
  }

  return (
    <Router>
      <div className={'container mb-2'}>
        <Link style={{ padding: 5 }} to='/'>
          {'authors'}
        </Link>
        <Link style={{ padding: 5 }} to='/books'>
          {'books'}
        </Link>
        {/*<Link style={{ padding: 5 }} to='/add-book'>*/}
        {/*  {'add book'}*/}
        {/*</Link>*/}
      </div>

      <Routes>
        <Route
          path={'/'}
          element={<Authors authors={authorsData.allAuthors} />}
        />
        <Route path={'/books'} element={<Books books={booksData.allBooks} />} />
        {/*<Route path={'/add-book'} element={<NewBook />} />*/}
      </Routes>
    </Router>
  )
}

export default App
