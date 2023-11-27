export const showNotificationHandler = (
  type,
  message,
  timeOut,
  notificationDispatch
) => {
  notificationDispatch({ type, payload: message })
  setTimeout(() => notificationDispatch({ type: 'reset' }), timeOut)
}
