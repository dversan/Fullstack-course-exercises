import Blog from './Blog/Blog.jsx'
import { useSelector } from 'react-redux'

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      <h2>{'blogs list'}</h2>
      <div id={'blogsList'}>
        {blogs?.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </>
  )
}

export default Blogs
