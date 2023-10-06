import React, { useEffect, useState } from 'react'
import countriesApi from '../services/countriesApi.jsx'

const CountryWeather = ({ country }) => {
  const [weatherData, setWeatherData] = useState()

  const coordinates = {
    lat: country.capitalInfo.latlng[0],
    lon: country.capitalInfo.latlng[1]
  }

  useEffect(() => {
    countriesApi.getCountryWeather(coordinates).then((r) => setWeatherData(r))
  }, [])

  return (
    <div>
      <h3>{`Weather in ${country.capital[0]}`}</h3>
      {weatherData && (
        <>
          <div>{`temperature ${(weatherData.main.temp - 273.15).toFixed(
            2
          )} Celsius`}</div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={'Icon about weather status'}
          />
          <div>{`wind ${weatherData.wind.speed} m/s`}</div>
        </>
      )}
    </div>
  )
}

export default CountryWeather
