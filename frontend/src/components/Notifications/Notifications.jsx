import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getNotifications, markNotificationAsRead, deleteNotification } from "../../api/notificationsApi"
import { FiX } from "react-icons/fi"
import styles from './Notifications.module.css'
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"

const Notifications = ({closePanel}) => {
  const userId = useSelector(state => state.auth.user?._id)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const goToUser = (userId, e) => {
    e.stopPropagation()
    closePanel?.()
    navigate(`/profile/${userId}`)
  }

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

  const handleDelete = async (id, e) => {
    e.stopPropagation()

    try {
      await deleteNotification(id)
      setNotifications(prev => prev.filter(n => n._id !== id))
    } catch (err) {
      return
    }
  }

  return (
   <div className={styles.wrapper}>
      {notifications.map(n => (
     <div
       key={n._id}
       className={`${styles.notification} ${!n.isRead ? styles.unread : ""}`}
       onClick={() => handleMarkAsRead(n._id)}>

        <img
        src={n.fromUser?.avatar || "/avatar.png"}
        alt={n.fromUser?.username || "user"}
        className={styles.avatar}/>

       <div className={styles.content}>
         {n.type === "follow" && (
          <p>
            <b
              className={styles.username}
              onClick={(e) => goToUser(n.fromUser?._id, e)}>
              {n.fromUser?.fullname}
            </b>{" "}
            started following you
          </p>
         )}

         {n.type === "like" && (
          <p>
            <b
              className={styles.username}
              onClick={(e) => goToUser(n.fromUser?._id, e)}>
              {n.fromUser?.fullname}
            </b>{" "}
            liked your post
          </p>
         )}

         {n.type === "comment" && (
          <p>
            <b
              className={styles.username}
              onClick={(e) => goToUser(n.fromUser?._id, e)}>
              {n.fromUser?.fullname}
            </b>{" "}
            commented on your post
          </p>
         )}

         <span className={styles.date}>
         {formatDistanceToNow(new Date(n.createdAt), {
          addSuffix: true,
          locale: enUS
         })}
         </span>

       </div>

       <button
          className={styles.closeBtn}
          onClick={(e) => handleDelete(n._id, e)}>
          <FiX size={18}/>
       </button>
      </div>
    ))}
  </div>
  )
}

export default Notifications
