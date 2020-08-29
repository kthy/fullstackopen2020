import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotesOrderedByVotesDesc = (anecdotes) => [...anecdotes].sort((a, b) => b.votes - a.votes)
  const anecdotes = useSelector(state => anecdotesOrderedByVotesDesc(state.anecdotes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }

  return (
    <>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
)
}

export default AnecdoteList
