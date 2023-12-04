import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog/Blog.jsx'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm.jsx'
import CreateBlogForm from './components/CreateBlogForm.jsx'
import Notification from './components/Notification/Notification.jsx'
import ToggleButton from './components/ToggleButton.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationContent } from './reducers/notificationReducer.js'
import { initializeBlogs, setBlogs } from './reducers/blogsReducer.js'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())

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
      dispatch(
        setNotificationContent({
          message: 'Wrong username or password',
          type: 'warning'
        })
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const toggleFormView = () => createBlogFormRef.current.toggleVisibility()

  const removeBlog = (blogToRemove) => {
    const blogsUpdated = blogs.filter((blog) => blog.id !== blogToRemove)

    setBlogs(blogsUpdated)
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
            />
          )}

          <div
            style={{ marginBottom: '5px' }}
          >{`${user.username} is logged in`}</div>
          <button
            type={'button'}
            style={{ marginBottom: '10px' }}
            onClick={handleLogout}
          >
            Logout
          </button>
          <ToggleButton buttonLabel={'Create blog'} ref={createBlogFormRef}>
            <CreateBlogForm
              initialFormValues={{ title: '', author: '', url: '' }}
              user={user}
              toggleView={toggleFormView}
            />
          </ToggleButton>
          <h2>{'blogs list'}</h2>
          <div id={'blogsList'}>
            {blogs?.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                onRemoveBlog={removeBlog}
              />
            ))}
          </div>
        </div>
      )}
      {user === null && (
        <>
          {notification.message && (
            <Notification
              message={notification.message}
              notificationType={notification.type}
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
