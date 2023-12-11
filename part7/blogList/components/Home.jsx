import { useEffect, useRef } from 'react'
import blogService from '../services/blogs.js'
import LoginForm from '../components/LoginForm.jsx'
import CreateBlogForm from '../components/CreateBlogForm.jsx'
import Notification from '../components/Notification/Notification.jsx'
import ToggleButton from '../components/ToggleButton.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer.js'
import { setUser } from '../reducers/userReducer.js'
import Blogs from './Blogs.jsx'

const Home = ({ user }) => {
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

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
    <div className={'container'}>
      {user !== null && (
        <div>
          <button
            type={'button'}
            className={'btn btn-outline-danger btn-sm mt-1 mb-4'}
            onClick={handleLogout}
          >
            {'Logout'}
          </button>
          <ToggleButton buttonLabel={'Create blog'} ref={createBlogFormRef}>
            <CreateBlogForm user={user} toggleView={toggleFormView} />
          </ToggleButton>
          <div style={{ marginTop: '1em' }}>
            <Blogs user={user} />
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
    </div>
  )
}

export default Home
