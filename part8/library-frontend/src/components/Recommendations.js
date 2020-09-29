import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  console.group('Recommendations Component')

  try {
    const [genre, setGenre] = useState('')
    const [recommendations, setRecommendations] = useState([])

    const [getRecommendations, {loadingRecs, recsResult}] = useLazyQuery(ALL_BOOKS);

    useEffect(() => {
      console.log('useEffect 1')
      console.log('props.currentUser', props.currentUser)
      const g = props.currentUser.data.me?.favoriteGenre
      if (g) {
        setGenre(g)
        if (!loadingRecs) {
          getRecommendations({ variables: { genre } })
        }
      }
    }, [genre, loadingRecs, props.currentUser]) // eslint-disable-line

    if (!props.show) {
      return null
    }

    if (loadingRecs) {
      console.log('loading recommendations...')
      return <div>loading recommendations...</div>
    }

    console.log('recsResult', recsResult)
    if (recsResult && recsResult.allBooks) {
      console.log('setRecommendations')
      setRecommendations(recsResult.allBooks)
    }

    console.log('recommendations', recommendations)

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
            {recommendations?.data?.allBooks.map(b =>
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
  } finally {
    console.groupEnd()
  }
}

export default Recommendations
