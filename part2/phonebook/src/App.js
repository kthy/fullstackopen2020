import React, { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('+45 ')
  const [ nameFilter, setNameFilter ] = useState('A')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('+45 ')
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
