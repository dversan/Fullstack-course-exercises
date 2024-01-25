import { Button, Table } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_GENRES } from '../queries.js'
import { useState } from 'react'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState()

  const { data: allBooksData, loading: allBooksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })
  const books = allBooksData?.allBooks

  const { data: userGenres } = useQuery(GET_GENRES)
  const genres = [...new Set(userGenres?.allBooks.flatMap((obj) => obj.genres))]

  if (allBooksLoading) {
    return <div>loading...</div>
  }

  return (
    <div className={'container mt-4'}>
      <h2 style={{ marginBottom: 16 }}>Books</h2>
      {selectedGenre && <h5>{`In genre ${selectedGenre}`}</h5>}
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        {genres.map((genre) => (
          <Button
            style={{ marginLeft: 4 }}
            key={`${genre}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Books
