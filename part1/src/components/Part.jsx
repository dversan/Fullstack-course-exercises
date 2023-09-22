import React from 'react'

const Part = (props) => {
  return (
    <div>
      <p>
        {props.partContent.part1} {props.partContent.exercises1}
      </p>
      <p>
        {props.partContent.part2} {props.partContent.exercises2}
      </p>
      <p>
        {props.partContent.part3} {props.partContent.exercises3}
      </p>
    </div>
  )
}

export default Part
