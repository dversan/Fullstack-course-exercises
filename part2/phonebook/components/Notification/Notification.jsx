import styles from './notification.module.css'

const Notification = ({ message }) => {
  return <div className={styles.notification}>{message}</div>
}

export default Notification
