import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    console.log('add', anecdote)
    event.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`You added "${anecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
