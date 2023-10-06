import React from 'react'

const Persons = ({ persons, personsFiltered, filterValue, onClick }) => {
  const anyNameMatches = personsFiltered.length > 0

  const listToBeDisplayed = anyNameMatches
    ? personsFiltered
    : filterValue !== ''
      ? []
      : persons

  return (
    <div>
      {persons.length === 0
        ? 'Please enter a Name'
        : listToBeDisplayed.map((person) => (
            <div key={person.id} style={{ display: 'flex', gap: '10px' }}>
              <div>{`${person.name} ${person.number}`}</div>
              <button onClick={() => onClick(person)}>
                {'delete'}
              </button>
            </div>
        ))}
    </div>
  )
}

export default Persons
