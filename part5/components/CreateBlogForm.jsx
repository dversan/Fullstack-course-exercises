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
            data-testid={'title'}
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
            data-testid={'author'}
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
            data-testid={'url'}
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
          {'save'}
        </button>
      </form>
    </>
  )
}

export default CreateBlogForm
