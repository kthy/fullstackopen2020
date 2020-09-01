import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Notify from './Notify'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
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

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const setBornTo = Number(born)

    if (!name) {
      alert('Please select an author')
      return
    }

    if (!setBornTo) {
      alert('Please provide a birth year')
      return
    }

    editAuthor({ variables: { name, setBornTo } })

    setName('')
    setBorn('')
  }

  if (props.result.loading)  {
    return <div>loading authors...</div>
  }

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
          {props.result.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birth year</h3>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option key="00000000-0000-0000-0000-000000000000" value=""></option>
            {props.result.data.allAuthors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
