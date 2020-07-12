import React from 'react'
import Button from './Button'
import Country from './Country'

const Display = ({ countries, callback }) => {
  if (countries.length === 0) return <div></div>
  if (countries.length === 1) return <Country c={countries[0]} />
  if (countries.length > 10) return <div>Too many matches, specify another filter</div>
  return countries.map(c => { return (
    <div key={c.name}>
      {c.name} <Button whenClicked={() => callback(c.name)} label="show" />
    </div>)
  })
}

export default Display
