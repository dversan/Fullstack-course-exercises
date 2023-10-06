import React from 'react'

const Country = ({ country }) => {
  const countryLanguages = Object.entries(country.languages)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>{`capital ${country.capital}`}</div>
      <div>{`area ${country.area}`}</div>
      <h3>languages</h3>
      <ul>
        {countryLanguages.map((l) => (
          <li key={country.cca2}>{l[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default Country
