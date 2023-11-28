import React, { useState } from 'react'
import { useCountry, useField } from './hooks/index.js'
import CountryDetails from './components/ContryDetails'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <CountryDetails country={country} />
    </div>
  )
}

export default App
