import React from 'react'

const Course = ({ course }) => {
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
  return props.parts.map(p => <Part key={p.id} part={p.name} exercises={p.exercises} />)
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
  const total = props.parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

export default Course
