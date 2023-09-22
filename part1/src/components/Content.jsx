import Part from './Part.jsx'

const Content = (props) => {
  return (
    <div>
      <Part partContent={props.parts[0]} />
      <Part partContent={props.parts[1]} />
      <Part partContent={props.parts[2]} />
    </div>
  )
}

export default Content
