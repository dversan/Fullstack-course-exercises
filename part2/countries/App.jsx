import React, { useEffect, useState } from 'react'
import Filter from '../countries/components/Filter.jsx'
import countriesApi from './services/countriesApi.jsx'
import Countries from './components/Countries.jsx'
import Country from './components/Country.jsx'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])
  const [countryData, setCountryData] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    countriesApi.getAll().then((r) => setCountries(r))
  }, [])

  const countryFilterHandler = (e) => {
    setFilterValue(e.target.value)

    if (filterValue === '') {
      setCountryData([])
    }

    setCountriesFiltered(
      e.target.value !== ''
        ? countries.filter((c) =>
            c.name.common.toLowerCase().includes(e.target.value.toLowerCase())
          )
        : []
    )
  }

  const showCountryHandler = (selectedCountryName) => {
    countriesApi.getCountry(selectedCountryName).then((r) => setCountryData(r))
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
        <div>
          {countryData.length === 0 ? (
            <Countries
              countriesFiltered={countriesFiltered}
              onClick={showCountryHandler}
            />
          ) : (
            <Country country={countryData || {}} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
