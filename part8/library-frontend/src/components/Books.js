import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading books...</div>
  }

  const genres = new Set(props.result.data.allBooks.map(b => b.genres).flat())

  return (
    <div>
      <h2>books</h2>
      {genre ? <h3>in genre {genre}</h3>: <h3>all genres</h3>}
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
          {props.result.data.allBooks.filter(b => !genre || b.genres.includes(genre)).map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {[...genres].sort().map(g =>
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      )}
      <button key='all' onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
