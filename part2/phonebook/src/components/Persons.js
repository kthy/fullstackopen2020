import React from 'react'
import Button from './Button'
import Person from './Person'

const Persons = ({ persons, del }) => persons.map(p => {
  return (
    <div key={p.id}>
      <Person personObj={p} /> <Button whenClicked={() => del(p)} label="delete" />
    </div>
  )
})

export default Persons
