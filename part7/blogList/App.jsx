import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import { useSelector } from 'react-redux'
import Notification from './components/Notification/Notification.jsx'
import Blogs from './components/Blogs.jsx'
import UserInfo from './components/UserInfo.jsx'
import UsersList from './components/UsersList'
import { useEffect, useState } from 'react'
import usersService from './services/users.js'

const App = () => {
  const [users, setUsers] = useState([])
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    usersService.getAll().then((res) => setUsers(res))
  }, [])

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div className={'container'}>
        {user !== null && (
          <div>
            <Link style={padding} to='/'>
              home
            </Link>
            <Link style={padding} to='/blogs'>
              blogs
            </Link>
            <Link style={padding} to='/users'>
              users
            </Link>
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
          </div>
        )}
      </div>
      <Routes>
        <Route path={'/blogs'} element={<Blogs user={user} />} />
        <Route path={'/users'} element={<UsersList users={users} />} />
        <Route path={'/'} element={<Home user={user} />} />
        <Route path={'/users/:id'} element={<UserInfo users={users} />} />
      </Routes>
    </Router>
  )
}

export default App
