import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Authors from './components/Authors.jsx'
import Books from './components/Books.jsx'
import NewBook from './components/NewBook.jsx'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries.js'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import RecommendedBooks from './components/RecommendedBooks.jsx'
import { updateCache } from './ utils/helpers.jsx'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  const { data: authorsData, loading: authorsLoading } = useQuery(ALL_AUTHORS)
  const userLogAction = token ? 'logout' : 'login'

  useEffect(() => {
    setToken(window.localStorage.getItem('books-user-token'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`Book ${addedBook.title} added`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  if (authorsLoading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  const loginButtonClickHandler = () => {
    if (userLogAction === 'login') {
      navigate('/')
    } else {
      logout()
    }
  }

  return (
    <div className={'container m-2'}>
      <Link style={{ padding: 5 }} to='/authors'>
        {'authors'}
      </Link>
      <Link style={{ padding: 5 }} to='/books'>
        {'books'}
      </Link>
      {token && (
        <>
          <Link style={{ padding: 5 }} to='/add-book'>
            {'add book'}
          </Link>
          <Link style={{ padding: 5 }} to='/recommended'>
            {'recommended'}
          </Link>
        </>
      )}
      <Button
        variant={!token ? 'primary' : 'danger'}
        size={'sm'}
        onClick={loginButtonClickHandler}
      >
        {userLogAction}
      </Button>

      <Routes>
        <Route
          path={'/'}
          element={token ? <Books /> : <LoginForm setToken={setToken} />}
        />
        <Route
          path={'/authors'}
          element={<Authors authors={authorsData.allAuthors} />}
        />
        <Route path={'/books'} element={<Books token={token} />} />
        {token && (
          <>
            <Route path={'/recommended'} element={<RecommendedBooks />} />
            <Route path={'/add-book'} element={<NewBook />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
