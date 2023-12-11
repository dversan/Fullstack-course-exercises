import { useState } from 'react'
import blogService from '../services/blogs.js'
import { setNotificationContent } from '../reducers/notificationReducer.js'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer.js'

const CreateBlogForm = ({ user, toggleView }) => {
  const initialFormValues = { title: '', author: '', url: '' }
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState(initialFormValues)

  const handleBolgCreationSubmit = (event) => {
    event.preventDefault()
    try {
      blogService.setToken(user.token)
      dispatch(createNewBlog(newBlog))
      toggleView()
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

    setNewBlog(initialFormValues)
  }

  return (
    <>
      <h2>{'create new'}</h2>
      <form onSubmit={handleBolgCreationSubmit}>
        <div style={{ marginBottom: '5px' }}>
          {'title'}
          <input
            id={'title'}
            aria-label={'title'}
            type={'text'}
            value={newBlog.title}
            onChange={(e) => {
              setNewBlog({ ...newBlog, title: e.target.value })
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          {'author'}
          <input
            id={'author'}
            aria-label={'author'}
            type={'text'}
            value={newBlog.author}
            onChange={(e) => {
              setNewBlog({ ...newBlog, author: e.target.value })
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          {'url'}
          <input
            id={'url'}
            aria-label={'url'}
            type={'text'}
            value={newBlog.url}
            onChange={(e) => {
              setNewBlog({ ...newBlog, url: e.target.value })
            }}
            required
          />
        </div>
        <button type={'submit'} className={'btn btn-primary btn-sm my-2'}>
          {'save'}
        </button>
      </form>
    </>
  )
}

export default CreateBlogForm
