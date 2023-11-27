import { useContext } from 'react'
import AnecdotesContext from '../AnecdotesContext.jsx'

const Notification = () => {
  const [notification] = useContext(AnecdotesContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  return <>{notification && <div style={style}>{notification}</div>}</>
}

export default Notification
