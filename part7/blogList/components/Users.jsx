import { Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import usersService from '../services/users.js'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll().then((res) => setUsers(res))
  }, [])

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
            <th scope='row'>{user.username}</th>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Users
