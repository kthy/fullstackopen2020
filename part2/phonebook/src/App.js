import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personSvc from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('+45 ')
  const [ nameFilter, setNameFilter ] = useState('A')

  const [ notificationMessage, setNotificationMessage ] = useState('')
  const [ notificationIsError, setNotificationIsError ] = useState(false)

  const getAllPersons = () => {
    personSvc
      .getAll()
      .then(ps => setPersons(ps))
  }

  useEffect(getAllPersons, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook - replace the old number with a new one?`)) {
        personSvc
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
            setNotificationIsError(false)
            setNotificationMessage(`Updated ${newName}`)
            setTimeout(() => setNotificationMessage(null), 5000)
            setNewName('')
            setNewNumber('+45 ')
          })
      }
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      }

      personSvc
        .create(personObj)
        .then(p => {
          setPersons(persons.concat(p))
          setNotificationIsError(false)
          setNotificationMessage(`Added ${newName}`)
          setTimeout(() => setNotificationMessage(null), 5000)
          setNewName('')
          setNewNumber('+45 ')
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      if (personSvc.dellete(person.id)) {
        setPersons(persons.filter(p => p.id !== person.id))
      } else {
        alert(`Error deleting ${person.name}`)
      }
    }
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
      <Notification message={notificationMessage} isError={notificationIsError} />
      <Filter value={nameFilter} onChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} del={deletePerson} />
    </div>
  )
}

export default App
