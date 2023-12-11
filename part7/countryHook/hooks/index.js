import { useEffect, useState } from 'react'
import serviceCountries from '../service/countriesApi.jsx'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      serviceCountries
        .getCountry(name)
        .then((response) => setCountry(response))
        .catch((e) => setCountry({ error: e.response.status }))
    } else {
      setCountry(null)
    }
  }, [name])

  return country
}
