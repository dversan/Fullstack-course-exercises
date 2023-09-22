import React from 'react'

const Part = (props) => {
  return (
    <p>
      {props.partContent.name} {props.partContent.exercises}
    </p>
  )
}

export default Part
