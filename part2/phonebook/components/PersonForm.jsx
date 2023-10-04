import React from 'react'

const PersonForm = ({
  onSubmit,
  newName,
  onChangeName,
  newNumber,
  onChangeNumber
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '5px' }}>
        name: <input value={newName} onChange={onChangeName} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        number: <input value={newNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
