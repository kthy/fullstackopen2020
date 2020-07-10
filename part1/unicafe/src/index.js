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
    <div>
      <h1>give feedback</h1>
      <Button whenClicked={addGood} text="good" />
      <Button whenClicked={addNeutral} text="neutral" />
      <Button whenClicked={addBad} text="bad" />
      <h1>statistics</h1>
      <Display name="good" value={good} />
      <Display name="neutral" value={neutral} />
      <Display name="bad" value={bad} />
      <Display name="all" value={good+neutral+bad} />
      <Display name="average" value={(good-bad)/(good+neutral+bad)} />
      <Display name="positive" value={good/(good+neutral+bad)*100+'%'} />
    </div>
  )
}

const Button = props => <button onClick={props.whenClicked}>{props.text}</button>

const Display = props => <div>{props.name} {props.value}</div>

ReactDOM.render(<App />, document.getElementById('root'))
