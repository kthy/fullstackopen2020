import React, { useState } from 'react'

import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    const nameObject = {
      name: newName,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <Person key={p.name} name={p.name} />)}
    </div>
  )
}

export default App
