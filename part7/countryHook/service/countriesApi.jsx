import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountry = (selectedCountryName) => {
  const request = axios.get(`${baseUrl}/name/${selectedCountryName}`)
  return request.then((response) => response.data)
}

export default { getCountry }
