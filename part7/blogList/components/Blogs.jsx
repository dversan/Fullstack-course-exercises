import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className={'container'}>
      <h2>{'blogs list'}</h2>
      <div id={'blogsList'} className={'container d-grid gap-2'}>
        {blogs?.map((blog) => (
          <div key={blog.id} className={'border rounded p-2 d-flex gap-2'}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <div>{` - ${blog.author}`}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
