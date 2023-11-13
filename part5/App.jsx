import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog/Blog.jsx'
import blogService from './services/blogs'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm.jsx'
import Notification from './components/Notification/Notification.jsx'
import ToggleButton from './components/ToggleButton.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })
  const createBlogFormRef = useRef()

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
      setNotification({
        message: 'Wrong username or password',
        type: 'warning'
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (newBlog) => {
    try {
      blogService.setToken(user.token)
      blogService.create(newBlog).then((res) => blogs.push(res))
      createBlogFormRef.current.toggleVisibility()
      setNotification({
        type: 'success',
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`
      })
    } catch (exception) {
      setNotification({
        message: 'Something went wrong. Blog has not been created',
        type: 'warning'
      })
    }
  }

  const resetNotificationHandler = () => {
    setNotification({ message: '', type: '' })
  }

  return (
    <>
      {user !== null && (
        <div>
          <h2>blogs</h2>
          {notification.message && (
            <Notification
              message={notification.message}
              notificationType={notification.type}
              resetNotification={resetNotificationHandler}
            />
          )}

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
          <ToggleButton buttonLabel={'Create blog'} ref={createBlogFormRef}>
            <CreateBlogForm createNewBlog={createBlog} />
          </ToggleButton>
          <h2>{'blogs list'}</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} username={user.username} />
          ))}
        </div>
      )}
      {user === null && (
        <>
          {notification.message && (
            <Notification
              message={notification.message}
              notificationType={notification.type}
              resetNotification={resetNotificationHandler}
            />
          )}
          <ToggleButton buttonLabel={'login'}>
            <LoginForm
              username={username}
              password={password}
              onChangeUsername={({ target }) => setUsername(target.value)}
              onChangePassword={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </ToggleButton>
        </>
      )}
    </>
  )
}

export default App
