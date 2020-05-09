import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const books = useQuery(ALL_BOOKS)

  let genres
  if(books.data) {
    genres =  [ ...new Set(books.data.allBooks.map(b => b.genres).reduce((prev, curr) => prev.concat(curr))) ]
  }
  if (!props.show) {
    return null
  }

  if(books.loading || !books.data) {
    return <div>loading...</div>
  }
  const booksToShow = genre 
    ? books.data.allBooks.filter(b => b.genres.includes(genre))
    : books.data.allBooks

  return (
    
    <div>
      <h2>books</h2>

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
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {genres.map(g => 
        <button onClick={() => setGenre(g)} key={g}>{g}</button>)
      }
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books