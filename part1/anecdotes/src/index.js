import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const rng = () => Math.floor(Math.random() * anecdotes.length)
  const [selected, setSelected] = useState(rng)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const addVote = (idx) => {
    const cpy = [...votes]
    cpy[idx]++
    setVotes(cpy)
  }

  const top = () => votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button whenClicked={() => addVote(selected)} text="vote"/>
      <Button whenClicked={() => setSelected(rng)} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[top()]}</p>
      <p>has {votes[top()]} votes</p>
    </div>
  )
}

const Button = ({whenClicked, text}) => <button onClick={whenClicked}>{text}</button>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
