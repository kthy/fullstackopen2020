import React from 'react'
import Country from './Country'

const Display = ({ countries }) => {
  if (countries.length === 0) return <div></div>
  if (countries.length === 1) return <Country c={countries[0]} />
  if (countries.length > 10) return <div>Too many matches, specify another filter</div>
  return countries.map(c => <div>{c.name}</div>)
}

export default Display
