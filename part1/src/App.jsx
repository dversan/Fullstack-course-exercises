import Header from './components/Header.jsx'
import Content from './components/Content.jsx'
import Total from './components/Total.jsx'

const App = () => {
  const course = 'Half Stack application development'
  const courseContent = [
    { part1: 'Fundamentals of React', exercises1: 10 },
    { part2: 'Using props to pass data', exercises2: 7 },
    { part3: 'State of a component', exercises3: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={courseContent} />
      <Total content={courseContent} />
    </div>
  )
}

export default App
