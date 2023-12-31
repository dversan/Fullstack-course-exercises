import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personsApi from './services/personsApi.jsx'
import Notification from './components/Notification/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState([])
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })

  const updatePersons = () => personsApi.getAll().then((r) => setPersons(r))

  useEffect(() => {
    personsApi.getAll().then((r) => setPersons(r))
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

  const updatePerson = () => {
    const selectedPersonId = persons.filter(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    )[0].id

    if (
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      personsApi
        .update(selectedPersonId, { name: newName, number: newNumber })
        .then(updatePersons)
        .finally(() =>
          setNotification({
            message: `${newName} has been updated`,
            type: 'success'
          })
        )
    }
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()

    const nameAlreadyExists = () =>
      persons.filter((p) => p.name === newName).length === 1

    if (nameAlreadyExists()) {
      updatePerson()
    } else if (newName === '' || newNumber === '') {
      setNotification({ message: 'Content is missing', type: 'warning' })
    } else {
      personsApi
        .create({ name: newName, number: newNumber })
        .then(updatePersons)
        .then(() => {
          setNotification({
            message: `${newName} has been added`,
            type: 'success'
          })
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.error,
            type: 'warning'
          })
        })
    }
  }

  const deletePersonClickHandler = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsApi
        .remove(person.id)
        .then(updatePersons)
        .finally(() => {
          setNotification({
            message: `${person.name} has been removed`,
            type: 'warning'
          })
        })
    }
  }

  const resetNotificationHandler = () => {
    setNotification({ message: '', type: '' })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && (
        <Notification
          message={notification.message}
          notificationType={notification.type}
          resetNotification={resetNotificationHandler}
        />
      )}
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
        onClick={deletePersonClickHandler}
      />
    </div>
  )
}

export default App
