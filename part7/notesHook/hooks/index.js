import { useEffect, useState } from 'react'
import axios from 'axios'

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

export const useResource = (resourceUrl) => {
  const [data, setData] = useState([{}])

  useEffect(() => {
    axios.get(resourceUrl).then((response) => setData(response.data))
  }, [resourceUrl])

  const createObject = async (newObject) => {
    const response = await axios.post(resourceUrl, newObject)
    return response.data
  }

  return [data, { create: (object) => createObject(object) }]
}
