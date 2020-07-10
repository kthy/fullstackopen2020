import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  let contents = []
  for (let idx = 0; idx < props.parts.length; idx++) {
    contents.push(<Part key={idx} part={props.parts[idx].name} exercises={props.parts[idx].exercises} />)
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
  let sum = 0;
  props.parts.forEach(part => sum += part.exercises)
  return (
    <p>Number of exercises {sum}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
