import { Table } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries.js'

const RecommendedBooks = () => {
  const { data: currentUserData } = useQuery(ME)
  const favoriteGenre = currentUserData?.me.favoriteGenre
  const { data: allBooksData, loading: allBooksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre }
  })

  const books = allBooksData?.allBooks

  if (allBooksLoading) {
    return <div>loading...</div>
  }

  return (
    <div className={'container mt-4'}>
      <h2 style={{ marginBottom: 16 }}>Recommendations</h2>
      <h5>{`Books in your favorite genre ${favoriteGenre}`}</h5>
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
    </div>
  )
}

export default RecommendedBooks
