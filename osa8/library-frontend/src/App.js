
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import {  BOOK_ADDED, ALL_BOOKS, CURRENT_USER } from './queries'


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const [getUser, userResult] = useLazyQuery(CURRENT_USER)
  const [user, setUser] = useState({})

  
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added to the library`)
      updateCacheWith(addedBook)
    }
  })
  

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  

  useEffect(() => {
    if(userResult.data) {
      setUser(userResult.data.me)
    }
  }, [userResult.data])

  useEffect(() => {
    const tokenInMemory = localStorage.getItem('library-user-token')
    if(tokenInMemory) {
      setToken(tokenInMemory)
    }
  }, [])

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  } 

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token 
            ? <span>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
                <button onClick={() => logout()}>logout</button>
              </span>
            : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        userIsLoggedIn={token ? true : false}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setError={notify}
        getUser={getUser}
      />

      <Recommend
        show={page === 'recommend'}
        user={user}
      />
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App