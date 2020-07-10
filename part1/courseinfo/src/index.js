import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  let contents = []
  for (let idx = 0; idx < props.parts.length; idx++) {
    contents.push(<Part key={idx} part={props.parts[idx]} exercises={props.exercises[idx]} />)
  }
  return contents
}

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p key={props.idx}>{props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {props.exercises.reduce((a, b) => a + b, 0)}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
