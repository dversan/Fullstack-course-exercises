import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event)
  }

  return {
    type,
    value,
    onChange
  }
}
