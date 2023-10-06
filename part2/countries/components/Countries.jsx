import React from 'react'

const Countries = ({ countriesFiltered }) => {
  return (
    <div>
      {countriesFiltered.length > 10
        ? 'Too many matches, specify another filter'
        : countriesFiltered.map((c) => <div key={c.cca2}>{c.name.common}</div>)}
    </div>
  )
}

export default Countries
