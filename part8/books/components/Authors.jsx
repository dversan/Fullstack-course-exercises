import { Button, Form, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries.js'
import AuthorSelect from './AuthorSelect.jsx'

const Authors = ({ authors }) => {
  const [authName, setAuthName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [token, setToken] = useState(null)

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    setToken(window.localStorage.getItem('books-user-token'))
  }, [])

  const submitHandler = async (event) => {
    event.preventDefault()

    await editAuthor({
      variables: { name: authName, born: birthDate },
      refetchQueries: [{ query: ALL_AUTHORS }]
    })

    setAuthName('')
    setBirthDate('')
  }

  return (
    <div className={'container mt-4'}>
      <h2>Authors</h2>
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
      {token && (
        <>
          <h3>Set birthyear</h3>
          <Form onSubmit={submitHandler}>
            <AuthorSelect authors={authors} onSelectedAuthor={setAuthName} />
            <div>
              born
              <input
                type={'number'}
                name={'born'}
                className={'mx-2'}
                value={birthDate}
                onChange={(e) => setBirthDate(Number(e.target.value))}
              />
            </div>

            <div className={'pt-2'}>
              <Button className={'btn btn-sm'} type={'submit'}>
                Update Author
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  )
}

export default Authors
