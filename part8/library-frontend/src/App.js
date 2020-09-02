import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)

  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const recommendationsResult = useQuery(ALL_BOOKS)

  const loggedIn = () => token !== null

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} hidden={!loggedIn()}>add book</button>
        <button onClick={() => setPage('recommendations')} hidden={!loggedIn()}>recommendations</button>
        <button onClick={() => setPage('login')} hidden={loggedIn()}>login</button>
        <button onClick={logout} hidden={!loggedIn()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={authorsResult}
        loggedIn={loggedIn}
      />

      <Books
        show={page === 'books'}
        result={booksResult}
      />

      <NewBook show={page === 'add'} />

      <Recommendations
        show={page === 'recommendations'}
        result={recommendationsResult}
      />

      <Login
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken} />
    </div>
  )
}

export default App
