const Total = (props) => {
  return (
    <p>
      {`Number of exercises ${props.content[0].exercises1 + props.content[1].exercises2 + props.content[2].exercises3}`}
    </p>
  )
}

export default Total
