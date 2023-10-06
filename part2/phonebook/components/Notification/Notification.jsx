import styles from './notification.module.css'

const Notification = ({ message, notificationType }) => {
  return (
    <div
      className={
        notificationType === 'success' ? styles.success : styles.warning
      }
    >
      {message}
    </div>
  )
}

export default Notification