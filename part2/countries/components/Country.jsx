import React from 'react'
import CountryWeather from './CountryWheather'

const Country = ({ country }) => {
  const countryLanguages = Object.entries(country.languages)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>{`capital ${country.capital}`}</div>
      <div>{`area ${country.area}`}</div>
      <h4>languages</h4>
      <ul>
        {countryLanguages.map((l) => (
          <li key={country.cca2}>{l[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <CountryWeather country={country} />
    </div>
  )
}

export default Country
