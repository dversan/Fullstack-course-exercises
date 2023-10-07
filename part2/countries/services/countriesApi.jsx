import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then((response) => response.data)
}

const getCountry = (selectedCountryName) => {
  const request = axios.get(`${baseUrl}/name/${selectedCountryName}`)
  return request.then((response) => response.data)
}

const getCountryWeather = (countryCoordinates) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${
      countryCoordinates.lat
    }&lon=${countryCoordinates.lon}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  )
  return request.then((response) => response.data)
}

export default { getAll, getCountry, getCountryWeather }
