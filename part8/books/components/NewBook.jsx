import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries.js'
import { Button } from 'react-bootstrap'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK)

  const submit = async (event) => {
    event.preventDefault()

    await addBook({
      variables: { title, authorName, published, genres },
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
    })

    setTitle('')
    setPublished('')
    setAuthorName('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className={'container row'}>
      <h1>Add Book</h1>
      <form onSubmit={submit} className={'col'}>
        <div className={'row gy-2'}>
          <div className={'row-cols-2'}>
            <div className={'col-2'}>title</div>
            <div className={'col-6'}>
              <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
          </div>
          <div className={'row-cols-2'}>
            <div className={'col-2'}>author</div>
            <div className={'col-6'}>
              <input
                value={authorName}
                onChange={({ target }) => setAuthorName(target.value)}
              />
            </div>
          </div>
          <div className={'row-cols-2'}>
            <div className={'col-2'}>published</div>
            <div className={'col-6'}>
              <input
                type='number'
                value={published}
                onChange={({ target }) => setPublished(Number(target.value))}
              />
            </div>
          </div>
          <div>
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type='button'>
              add genre
            </button>
          </div>
          <div>genres: {genres.join(' ')}</div>
          <div className={'mt-4'}>
            <Button type='submit'>create book</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewBook
