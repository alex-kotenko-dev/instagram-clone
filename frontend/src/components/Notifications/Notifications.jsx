import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getNotifications, markNotificationAsRead } from "../../api/notificationsApi"
import styles from './Notifications.module.css'

const Notifications = () => {
  const userId = useSelector(state => state.auth.user?._id)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const res = await getNotifications()
      setNotifications(res.data)
    } catch (err) {
      console.error("Failed to fetch notifications:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id)
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      )
    } catch (err) {
      console.error("Failed to mark as read:", err)
    }
  }

  if (loading) return <p>Loading...</p>
  if (notifications.length === 0) return <p>No notifications</p>

  return (
    <div className={styles.wrapper}>
      {notifications.map(n => (
        <div
          key={n._id}
          className={`${styles.notification} ${!n.isRead ? styles.unread : ""}`}
          onClick={() => handleMarkAsRead(n._id)}
        >
          <img
            src={n.fromUser?.avatar || "/avatar.png"}
            alt={n.fromUser?.username || "user"}
            className={styles.avatar}
          />
          <div className={styles.content}>
            {n.type === "follow" && (
              <p><b>{n.fromUser?.fullname}</b> started following you</p>
            )}
            {n.type === "like" && (
              <p><b>{n.fromUser?.fullname}</b> liked your post</p>
            )}
            {n.type === "comment" && (
              <p><b>{n.fromUser?.fullname}</b> commented on your post</p>
            )}
            <span className={styles.date}>
              {new Date(n.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Notifications
