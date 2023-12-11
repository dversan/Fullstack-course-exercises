import { addComment, addLike } from '../reducers/blogsReducer.js'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { useState } from 'react'

const BlogInfo = () => {
  const dispatch = useDispatch()

  const { id: selectedBlogId } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState('')

  const selectedBlog = blogs.find((blog) => blog.id === selectedBlogId)

  if (!selectedBlog) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addComment(selectedBlog, comment))
  }

  return (
    <div className={'container border rounded d-grid p-2 gap-2'}>
      <h4>{selectedBlog.title}</h4>
      <a href={selectedBlog.url}>{selectedBlog.url}</a>
      <div className={'d-flex gap-3'}>
        <div id={'likesCount'} className={'align-self-center'}>
          {selectedBlog.likes}
        </div>
        <button
          id={'likesButton'}
          className={'btn btn-primary btn-sm'}
          type={'button'}
          onClick={() => dispatch(addLike(selectedBlog))}
        >
          {'likes'}
        </button>
      </div>
      <div> {user.username}</div>
      {selectedBlog.comments && (
        <section className={'container'}>
          <Table className={'table border'}>
            <thead>
              <tr>
                <th scope={'col'}>{'Comments'}</th>
              </tr>
            </thead>
            <tbody>
              {selectedBlog.comments?.map((comment) => (
                <tr key={comment}>
                  <td>{comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <form className={'row g-3'} onSubmit={handleSubmit}>
            <div className={'col-'}>
              <input
                id={'comment'}
                className={'form-control'}
                type={'text'}
                value={comment}
                name={'Comment'}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className={'col-auto'}>
              <button type={'submit'} className={'btn btn-primary btn-sm'}>
                {'Add Comment'}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  )
}

export default BlogInfo
