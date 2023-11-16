import styles from './notification.module.css'

const Notification = ({ message, notificationType, resetNotification }) => {
  if (message) {
    setTimeout(() => {
      resetNotification()
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
