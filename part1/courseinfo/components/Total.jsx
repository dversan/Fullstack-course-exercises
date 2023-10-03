const Total = ({ parts }) => {
  const exercises = parts.map((p) => p.exercises)

  const courseExercisesSum = exercises.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )

  return `Total of ${courseExercisesSum} exercises`
}

export default Total
