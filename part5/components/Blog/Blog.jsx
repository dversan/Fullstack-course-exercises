import { useState } from 'react'
import styles from './blog.module.css'

const Blog = ({ blog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className={styles.blogStyle}>
      <div className={styles.blogHeader}>
        <div>{`${blog.title} - ${blog.author}`}</div>
        <button type={'button'} onClick={handleShowDetails}>
          {showDetails ? 'hide' : 'details'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
          <div> {username}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
