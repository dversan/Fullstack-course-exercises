import { useState } from 'react'
import styles from './blog.module.css'
import { useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../../reducers/blogsReducer.js'

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const isAuthUser = blog.user.id === user.id
  const dispatch = useDispatch()

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const removeBlogHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div id={'blogContainer'} className={styles.blog}>
      <div className={styles.blogHeader}>
        <div>{`${blog.title} - ${blog.author}`}</div>
        <button type={'button'} onClick={handleShowDetails}>
          {showDetails ? 'hide' : 'details'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            <div id={'likesCount'}>{blog.likes}</div>
            <button
              id={'likesButton'}
              type={'button'}
              onClick={() => dispatch(addLike(blog))}
            >
              {'likes'}
            </button>
          </div>
          <div> {user.username}</div>
          {isAuthUser && (
            <button type={'button'} onClick={removeBlogHandler}>
              {'remove'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
