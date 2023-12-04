import styles from './notification.module.css'
import { useDispatch } from 'react-redux'
import { resetNotificationContent } from '../../reducers/notificationReducer.js'

const Notification = ({ message, notificationType }) => {
  const dispatch = useDispatch()

  if (message) {
    setTimeout(() => {
      dispatch(resetNotificationContent())
    }, 2000)
  }

  return (
    <div
      id={'loginErrorMessage'}
      className={
        notificationType === 'success' ? styles.success : styles.warning
      }
    >
      {message}
    </div>
  )
}

export default Notification
