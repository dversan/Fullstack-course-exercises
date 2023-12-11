import { addLike } from '../reducers/blogsReducer.js'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const BlogInfo = () => {
  const dispatch = useDispatch()

  const { id: selectedBlogId } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const selectedBlog = blogs.find((blog) => blog.id === selectedBlogId)

  return (
    <div className={'container border rounded d-grid p-2 gap-2'}>
      <h4>{selectedBlog.title}</h4>
      <a href={selectedBlog.url}>{selectedBlog.url}</a>
      <div className={'d-flex gap-3'}>
        <div id={'likesCount'}>{selectedBlog.likes}</div>
        <button
          id={'likesButton'}
          type={'button'}
          onClick={() => dispatch(addLike(selectedBlog))}
        >
          {'likes'}
        </button>
      </div>
      <div> {user.username}</div>
    </div>
  )
}

export default BlogInfo
