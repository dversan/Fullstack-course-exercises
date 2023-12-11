import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UsersList = ({ users }) => {
  if (!users) return null

  return (
    <Table className={'container'} striped>
      <thead>
        <tr>
          <th scope='col'></th>
          <th scope='col'>Blogs</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <th scope='row'>
              {<Link to={`/users/${user.id}`}>{user.username}</Link>}
            </th>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default UsersList
