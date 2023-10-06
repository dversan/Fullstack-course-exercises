import React, { useEffect, useState } from 'react'
import Filter from '../countries/components/Filter.jsx'
import countriesApi from './services/countriesApi.jsx'
import Countries from './components/Countries.jsx'
import Country from './components/Country.jsx'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])

  useEffect(() => {
    countriesApi.getAll().then((r) => setCountries(r))
  }, [])

  const countryFilterHandler = (e) => {
    setCountriesFiltered(
      e.target.value !== ''
        ? countries.filter((c) =>
            c.name.common.toLowerCase().includes(e.target.value.toLowerCase())
          )
        : []
    )
  }

  return (
    <div>
      <Filter onChange={countryFilterHandler} />
      {countriesFiltered.length === 1 && (
        <div>
          <Country country={countriesFiltered[0]} />
        </div>
      )}

      {countriesFiltered.length > 1 && (
        <Countries countriesFiltered={countriesFiltered} />
      )}
    </div>
  )
}

export default App
