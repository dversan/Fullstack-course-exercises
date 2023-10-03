import Part from './Part.jsx'

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p) => (
        <Part key={p.id} partContent={p} />
      ))}
    </div>
  )
}

export default Content
