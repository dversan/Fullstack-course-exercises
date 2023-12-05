import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home.jsx'
import Users from './components/Users.jsx'
import { useSelector } from 'react-redux'
import Notification from './components/Notification/Notification.jsx'
import Blogs from './components/Blogs.jsx'

const App = () => {
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)

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
            <Link style={padding} to='/notes'>
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
        <Route path='/notes' element={<Blogs user={user} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={<Home user={user} />} />
      </Routes>
    </Router>
  )
}

export default App
