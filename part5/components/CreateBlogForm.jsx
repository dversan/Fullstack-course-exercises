import { useState } from 'react'

const CreateBlogForm = ({ createNewBlog, initialFormValues }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBolgCreationSubmit = (event) => {
    event.preventDefault()
    createNewBlog(newBlog)
    setNewBlog(initialFormValues)
  }

  return (
    <>
      <h2>{'create new'}</h2>
      <form onSubmit={handleBolgCreationSubmit}>
        <div style={{ marginBottom: '5px' }}>
          {'title'}
          <input
            type={'text'}
            value={newBlog.title}
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
            value={newBlog.author}
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
            value={newBlog.url}
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
