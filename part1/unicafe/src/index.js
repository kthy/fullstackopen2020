import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button whenClicked={addGood} text="good" />
      <Button whenClicked={addNeutral} text="neutral" />
      <Button whenClicked={addBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Button = ({whenClicked, text}) => <button onClick={whenClicked}>{text}</button>

const Display = ({name, value}) => <div>{name} {value}</div>

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  if (all===0) return (<p>No feedback given</p>)
  return [
    <Display key="good" name="good" value={good} />,
    <Display key="neutral" name="neutral" value={neutral} />,
    <Display key="bad" name="bad" value={bad} />,
    <Display key="all" name="all" value={all} />,
    <Display key="average" name="average" value={(good-bad)/all} />,
    <Display key="positive" name="positive" value={good/all*100+'%'} />,
  ]
}

ReactDOM.render(<App />, document.getElementById('root'))
