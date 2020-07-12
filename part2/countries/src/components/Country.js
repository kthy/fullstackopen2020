import React from 'react'

const Country = ({ c }) => {
  return (
    <div>
      <h1>{c.name}</h1>
      <div>capital {c.capital}</div>
      <div>population {c.population}</div>
      <h3>languages</h3>
      <ul>
        {c.languages.map(l => <li>{l.name}</li>)}
      </ul>
      <img width="128px" src={c.flag} alt={`Flag of ${c.name}`} />
    </div>
  )
}

export default Country
