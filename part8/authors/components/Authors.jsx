import { Table } from 'react-bootstrap'

const Authors = ({ authors }) => {
  return (
    <div className={'container'}>
      <h2>authors</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Authors
