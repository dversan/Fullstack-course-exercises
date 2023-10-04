import React from 'react'

const Persons = ({ persons, personsFiltered, filterValue }) => {
  const anyNameMatches = personsFiltered.length > 0

  const listToBeDisplayed =
    anyNameMatches
      ? personsFiltered
      : filterValue !== ''
        ? []
        : persons

  return (
    <div>
      {persons.length === 0
        ? 'Please enter a Name'
        : listToBeDisplayed.map((person) => (
            <div key={person.id}>{`${person.name} ${person.number}`}</div>
        ))}
    </div>
  )
}

export default Persons
