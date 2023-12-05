import { useEffect, useRef } from 'react'
import Blog from './components/Blog/Blog.jsx'
import blogService from './services/blogs.js'
import LoginForm from './components/LoginForm.jsx'
import CreateBlogForm from './components/CreateBlogForm.jsx'
import Notification from './components/Notification/Notification.jsx'
import ToggleButton from './components/ToggleButton.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer.js'
import { setUser } from './reducers/userReducer.js'

const App = () => {
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const toggleFormView = () => createBlogFormRef.current.toggleVisibility()

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
          >{`${user?.username} is logged in`}</div>
          <button
            type={'button'}
            style={{ marginBottom: '10px' }}
            onClick={handleLogout}
          >
            Logout
          </button>
          <ToggleButton buttonLabel={'Create blog'} ref={createBlogFormRef}>
            <CreateBlogForm user={user} toggleView={toggleFormView} />
          </ToggleButton>
          <h2>{'blogs list'}</h2>
          <div id={'blogsList'}>
            {blogs?.map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
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
            <LoginForm />
          </ToggleButton>
        </>
      )}
    </>
  )
}

export default App
