import React, { useState } from 'react'
import axios from 'axios'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  const handleFilterChange = (event) => loadCountryData(event.target.value)

  const loadCountryData = (c) => {
    setFilter(c)
    axios
      .get(`https://restcountries.eu/rest/v2/name/${c}`)
      .then(response => setCountries(response.data))
  }

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Display countries={countries} callback={loadCountryData} />
    </div>
  )
}

export default App
