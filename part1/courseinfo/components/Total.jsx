const Total = ({ parts }) => {
  const exercises = parts.map((p) => p.exercises)

  const courseExercisesSum = exercises.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )

  return <h4>{`Total of ${courseExercisesSum} exercises`}</h4>
}

export default Total
