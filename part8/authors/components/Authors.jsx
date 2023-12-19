import { Button, Form, Table } from 'react-bootstrap'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries.js'

const Authors = ({ authors }) => {
  const [authName, setAuthName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submitHandler = async (event) => {
    event.preventDefault()

    await editAuthor({
      variables: { name: authName, born: birthDate }
    })

    setAuthName('')
    setBirthDate('')
  }

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
      <h3>Set birthyear</h3>
      <Form onSubmit={submitHandler}>
        <div>
          name
          <input
            type={'text'}
            name={'authName'}
            value={authName}
            onChange={(e) => setAuthName(e.target.value)}
          />
        </div>
        <div>
          born
          <input
            type={'number'}
            name={'born'}
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
    </div>
  )
}

export default Authors
