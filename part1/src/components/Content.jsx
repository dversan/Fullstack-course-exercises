const Content = (props) => {
  return (
    <div>
      <p>
        {props.content[0].part1} {props.content[0].exercises1}
      </p>
      <p>
        {props.content[1].part2} {props.content[0].exercises2}
      </p>
      <p>
        {props.content[2].part3} {props.content[0].exercises3}
      </p>
    </div>
  )
}

export default Content
