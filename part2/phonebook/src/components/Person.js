import React from 'react'

const Person = ({ personObj }) => {
  return (
    <>{personObj.name} {personObj.number}<br/></>
  )
}

export default Person
