import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data))
  }, [])

  const nameFilterHandler = (e) => {
    setFilterText(e.target.value)

    setPersonsFiltered(
      e.target.value !== ''
        ? persons.filter((p) =>
          p.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        : []
    )
  }

  const newNameInputHandler = (e) => {
    setNewName(e.target.value)
  }

  const newNumberInputHandler = (e) => {
    setNewNumber(e.target.value)
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()

    const nameAlreadyExists =
      persons.filter((p) => p.name === newName).length === 1

    if (nameAlreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1
        })
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={nameFilterHandler} />
      <h3>Add new</h3>
      <PersonForm
        onSubmit={formSubmitHandler}
        newName={newName}
        newNumber={newNumber}
        onChangeName={newNameInputHandler}
        onChangeNumber={newNumberInputHandler}
      />
      <h3>Numbers</h3>
      <Persons
        personsFiltered={personsFiltered}
        persons={persons}
        filterValue={filterText}
      />
    </div>
  )
}

export default App
