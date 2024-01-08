import { Button, Table } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { GET_GENRES } from '../queries.js'
import { useState } from 'react'

const Books = ({ books }) => {
  const [selectedGenre, setSelectedGenre] = useState('Fantastic')
  const { data } = useQuery(GET_GENRES)
  const genres = [...new Set(data?.allBooks.flatMap((obj) => obj.genres))]

  return (
    <div className={'container mt-4'}>
      <h2 style={{ marginBottom: 16 }}>Books</h2>
      <h5>{`In genre ${selectedGenre}`}</h5>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            ?.filter((book) => book.genres.includes(selectedGenre))
            .map((a) => (
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
