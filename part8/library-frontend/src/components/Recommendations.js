import React from 'react'
import { useQuery } from '@apollo/client';
import { ME } from '../queries'

const Recommendations = (props) => {
  const currentUser = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (props.result.loading || currentUser.loading) {
    return <div>loading recommendations...</div>
  }

  const genre = currentUser.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.result.data.allBooks.filter(b => b.genres.includes(genre)).map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
