import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
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
          <p>{`${user.username} is logged in`}</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {user === null && (
        <>
          <h2>Log in to application</h2>
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
