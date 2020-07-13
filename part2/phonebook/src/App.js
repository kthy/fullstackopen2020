import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personSvc from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('+45 ')
  const [ nameFilter, setNameFilter ] = useState('A')

  const hook = () => {
    personSvc
      .getAll()
      .then(ps => setPersons(ps))
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    const personObj = {
      name: newName,
      number: newNumber,
    }

    personSvc
      .create(personObj)
      .then(p => {
        setPersons(persons.concat(p))
        setNewName('')
        setNewNumber('+45 ')
      })
  }

  const handleFilterChange = (event) => setNameFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const personsToShow = nameFilter
    ? persons.filter(p => p.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0)
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={nameFilter} onChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
