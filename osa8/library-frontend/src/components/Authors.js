import React, {} from 'react'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import Birthyear from './Birthyear'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  
  if(authors.loading || !authors.data) {
    return <div>loading...</div>
  }

  let authorOptions = authors.data.allAuthors.map(a => {
    return { value: a.name, label: a.name}
  })
  authorOptions = [{value: 'default', label: 'Select an author'}, ...authorOptions]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {
        props.userIsLoggedIn &&
        <Birthyear options={authorOptions}
          setError={props.setError} />
      }
    </div>
  )
}

export default Authors
