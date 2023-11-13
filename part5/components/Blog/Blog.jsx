import { useState } from 'react'
import styles from './blog.module.css'
import blogService from '../../services/blogs.js'

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogToUpdate = {
    user: user.id,
    likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLikesCount = async () => {
    setLikes(likes + 1)
    const updatedBlog = {
      ...blogToUpdate,
      likes: likes + 1
    }
    await blogService.update(blog.id, updatedBlog)
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
          <div>
            <div>{likes}</div>
            <button type={'button'} onClick={handleLikesCount}>
              {'likes'}
            </button>
          </div>
          <div> {user.username}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
