import { useNavigate } from "react-router-dom"
import styles from "./FollowMessageButton.module.css"

const MessageButton = ({ recipientId }) => {
  const navigate = useNavigate()

  if (!recipientId) return null

  const handleClick = () => {
    navigate(`/messages/${recipientId}`)
  }

  return (
    <button onClick={handleClick} className={styles.messageBtn}>
      Message
    </button>
  )
}


export default MessageButton