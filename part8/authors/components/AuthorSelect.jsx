import { useEffect, useState } from 'react'
import { FormSelect } from 'react-bootstrap'

function AuthorSelect({ authors, onSelectedAuthor }) {
  const [selectedAuthor, setSelectedAuthor] = useState('')

  useEffect(() => {
    onSelectedAuthor(selectedAuthor)
  }, [selectedAuthor])

  const selectAuthorHandler = (event) => {
    event.preventDefault()

    setSelectedAuthor(event.target.value)
  }

  return (
    <FormSelect
      className={'mb-2'}
      value={selectedAuthor}
      onChange={selectAuthorHandler}
    >
      {authors.map((author) => (
        <option key={author.id} value={author.name}>
          {author.name}
        </option>
      ))}
    </FormSelect>
  )
}

export default AuthorSelect
