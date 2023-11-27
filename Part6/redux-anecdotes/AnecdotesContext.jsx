import { createContext, useReducer } from 'react'

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'create':
      return action.payload
    case 'vote':
      return action.payload
    case 'reset':
      return null
    case 'error':
      return 'too short anecdote, must have length 5 or more '
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
