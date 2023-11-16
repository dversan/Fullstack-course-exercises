import { useState } from 'react'
import styles from './blog.module.css'
import blogService from '../../services/blogs.js'

const Blog = ({ blog, user, onRemoveBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const isAuthUser = blog.user.id === user.id

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

  const removeBlogHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      onRemoveBlog(blog.id)
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
            <div id={'likesCount'}>{likes}</div>
            <button type={'button'} onClick={handleLikesCount}>
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
