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
        <button type={'submit'} style={{ marginBottom: '10px' }}>
          {'save'}
        </button>
      </form>
    </>
  )
}

export default CreateBlogForm
