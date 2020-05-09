import React, { useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Recommend = (props) => {
  const [getRecommendations, recommendations] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if(props.user) {
      getRecommendations({ variables: { genre: props.user.favoriteGenre } })
    }
  }, [props.user]) // eslint-disable-line 

  if(!props.show) {
    return null
  }

  if(recommendations.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{props.user.favoriteGenre}</b></p>
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
          { recommendations.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend