import { useState } from 'react'

const CreateBlogForm = ({ title, author, url, createNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBolgCreationSubmit = (event) => {
    event.preventDefault()
    createNewBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <>
      {' '}
      <h2>{'create new'}</h2>
      <form onSubmit={handleBolgCreationSubmit}>
        <div style={{ marginBottom: '5px' }}>
          {'title'}
          <input
            type={'text'}
            value={title}
            name={'title'}
            onChange={(e) => {
              setNewBlog({ ...newBlog, title: e.target.value })
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          {'author'}
          <input
            type={'text'}
            value={author}
            name={'author'}
            onChange={(e) => {
              setNewBlog({ ...newBlog, author: e.target.value })
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          {'url'}
          <input
            type={'text'}
            value={url}
            name={'url'}
            onChange={(e) => {
              setNewBlog({ ...newBlog, url: e.target.value })
            }}
            required
          />
        </div>
        <button type={'submit'} style={{ marginBottom: '10px' }}>
          {'create blog'}
        </button>
      </form>
    </>
  )
}

export default CreateBlogForm
