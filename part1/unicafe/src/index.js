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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Button = props => <button onClick={props.whenClicked}>{props.text}</button>

const Display = props => <div>{props.name} {props.value}</div>

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  return [
    <h1>statistics</h1>,
    <Display name="good" value={good} />,
    <Display name="neutral" value={neutral} />,
    <Display name="bad" value={bad} />,
    <Display name="all" value={all} />,
    <Display name="average" value={(good-bad)/all} />,
    <Display name="positive" value={good/all*100+'%'} />,
  ]
}

ReactDOM.render(<App />, document.getElementById('root'))
