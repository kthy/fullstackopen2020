import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotesOrderedByVotesDesc = (anecdotes) => [...anecdotes].sort((a, b) => b.votes - a.votes)
  const anecdotes = useSelector(state => anecdotesOrderedByVotesDesc(state.anecdotes))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(setNotification(`You voted for "${anecdote.content}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
)
}

export default AnecdoteList
