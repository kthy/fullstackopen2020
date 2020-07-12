import React from 'react'
import Weather from './Weather'

const Country = ({ c }) => {
  return (
    <div>
      <h1>{c.name}</h1>
      <div>capital {c.capital}</div>
      <div>population {c.population}</div>
      <h3>languages</h3>
      <ul>
        {c.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img width="128px" src={c.flag} alt={`Flag of ${c.name}`} />
      <Weather country={c.name} capital={c.capital} />
    </div>
  )
}

export default Country
