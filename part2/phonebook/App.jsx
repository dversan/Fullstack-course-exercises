import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState([])

  const nameAlreadyExists =
    persons.filter((p) => p.name === newName).length === 1

  const formSubmitHandler = (e) => {
    e.preventDefault()

    if (nameAlreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
  }

  const nameFilterHandler = (e) => {
    setPersonsFiltered(
      persons.filter((p) =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )

    if (e.target.value === '') {
      setPersonsFiltered([])
    }
  }

  const newNameInputHandler = (e) => {
    setNewName(e.target.value)
  }

  const newNumberInputHandler = (e) => {
    setNewNumber(e.target.value)
  }

  const listToBeDisplayed = personsFiltered.length === 0 ? persons : personsFiltered

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        {<input onChange={nameFilterHandler} />}
      </div>
      <h2>Add new</h2>
      <form onSubmit={formSubmitHandler}>
        <div style={{ marginBottom: '5px' }}>
          name: <input value={newName} onChange={newNameInputHandler} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          number: <input value={newNumber} onChange={newNumberInputHandler} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length === 0
        ? 'Please enter a Name'
        : listToBeDisplayed.map((person) => (
            <div key={person.name}>{`${person.name} ${person.number}`}</div>
        ))}
    </div>
  )
}

export default App
