const Total = (props) => {
  return (
    <p>
      {`Number of exercises ${
        props.content[0].exercises +
        props.content[1].exercises +
        props.content[2].exercises
      }`}
    </p>
  )
}

export default Total
