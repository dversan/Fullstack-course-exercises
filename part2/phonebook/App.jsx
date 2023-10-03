import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const nameAlreadyExists =
    persons.filter((p) => p.name === newName).length === 1

  const formSubmitHandler = (e) => {
    e.preventDefault()

    if (nameAlreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName }))
    }
  }

  const newNameInputHandler = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmitHandler}>
        <div>
          name: <input value={newName} onChange={newNameInputHandler} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length === 0
        ? 'Please enter a Name'
        : persons.map((person) => <div key={person.name}> {person.name}</div>)}
    </div>
  )
}

export default App
