import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import Notify from './Notify'
import { LOGIN, ME } from '../queries'

const Login = ({ setPage, setToken, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: ME } ],
    onError: (error) => {
      if (error.graphQLErrors.length > 1) {
        console.log('error.graphQLErrors', error.graphQLErrors)
        notify(error.graphQLErrors[0].message)
      } else {
        notify(error.toString())
      }
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setPage('books')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
