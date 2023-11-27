import { createContext, useReducer } from 'react'

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'create':
      return `New anecdote ${action.payload} has been created`
    case 'vote':
      return `You voted ${action.payload}`
    case 'reset':
      return null
  }
}

const AnecdotesContext = createContext()

export const AnecdotesContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <AnecdotesContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdotesContext.Provider>
  )
}

export default AnecdotesContext
