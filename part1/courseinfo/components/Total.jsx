const Total = (props) => {
  let courseExercisesSum = 0

  props.parts.forEach((part) => {
    courseExercisesSum += part.exercises
  })

  console.log(courseExercisesSum)

  return `Total of ${courseExercisesSum} exercises`
}

export default Total
