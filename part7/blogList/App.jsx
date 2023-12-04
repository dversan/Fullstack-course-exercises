import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog/Blog.jsx'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm.jsx'
import CreateBlogForm from './components/CreateBlogForm.jsx'
import Notification from './components/Notification/Notification.jsx'
import ToggleButton from './components/ToggleButton.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationContent } from './reducers/notificationReducer.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    const sortedBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)
    blogService.getAll().then((blogsInDb) => setBlogs(sortedBlogs(blogsInDb)))

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

  const createBlog = (newBlog) => {
    try {
      blogService.setToken(user.token)
      blogService.create(newBlog).then((res) => blogs.push(res))
      createBlogFormRef.current.toggleVisibility()
      dispatch(
        setNotificationContent({
          type: 'success',
          message: `A new blog ${newBlog.title} by ${newBlog.author} added`
        })
      )
    } catch (exception) {
      dispatch(
        setNotificationContent({
          message: 'Something went wrong. Blog has not been created',
          type: 'warning'
        })
      )
    }
  }

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
              createNewBlog={createBlog}
              initialFormValues={{ title: '', author: '', url: '' }}
            />
          </ToggleButton>
          <h2>{'blogs list'}</h2>
          <div id={'blogsList'}>
            {blogs.map((blog) => (
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
