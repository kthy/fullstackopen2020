import React, { useState } from 'react'
import axios from 'axios'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    axios
      .get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
      .then(response => setCountries(response.data))
  }

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Display countries={countries} />
    </div>
  )
}

export default App
