import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBolgCreationSubmit = (event) => {
    event.preventDefault()
    try {
      blogService.setToken(user.token)
      blogService.create(newBlog)
      setNewBlog({ title: '', author: '', url: '' })
    } catch (exception) {
      setErrorMessage('Something went wrong. Blog has not been created')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <div
            style={{ marginBottom: '5px' }}
          >{`${user.username} is logged in`}</div>
          <button
            type={'reset'}
            style={{ marginBottom: '10px' }}
            onClick={handleLogout}
          >
            Logout
          </button>
          <form onSubmit={handleBolgCreationSubmit}>
            <CreateBlogForm
              author={newBlog.author}
              title={newBlog.title}
              url={newBlog.url}
              onChangeAuthor={(e) =>
                setNewBlog({ ...newBlog, author: e.target.value })
              }
              onChangeTitle={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              onChangeUrl={(e) =>
                setNewBlog({ ...newBlog, url: e.target.value })
              }
            />
          </form>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {user === null && (
        <>
          <form onSubmit={handleLogin}>
            <LoginForm
              username={username}
              password={password}
              onChangeUsername={({ target }) => setUsername(target.value)}
              onChangePassword={({ target }) => setPassword(target.value)}
            />
          </form>
        </>
      )}
    </>
  )
}

export default App
