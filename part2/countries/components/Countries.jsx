import React from 'react'

const Countries = ({ countriesFiltered, onClick }) => {
  return (
    <div>
      {countriesFiltered.length > 10
        ? 'Too many matches, specify another filter'
        : countriesFiltered.map((c) => (
            <div key={c.cca2}>
              {
                <div
                  style={{ display: 'flex', gap: '10px', margin: '5px' }}
                >
                  <div>{c.name.common}</div>
                  <button onClick={() => onClick(c.name.common)}>
                    {'show'}
                  </button>
                </div>
              }
            </div>
          ))}
    </div>
  )
}

export default Countries
