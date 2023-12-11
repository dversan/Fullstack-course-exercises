import { useParams } from 'react-router-dom'

const UserInfo = ({ users }) => {
  const { id: selectedUserId } = useParams()
  if (!users) return null

  const selectedUser = users.find((user) => user.id === selectedUserId)

  return (
    <div className={'container'}>
      <h2 style={{ marginTop: '1em' }}>{selectedUser.username}</h2>
      <h5>Added Blogs</h5>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
