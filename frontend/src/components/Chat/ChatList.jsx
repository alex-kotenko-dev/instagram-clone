import styles from "./chatStyles/ChatList.module.css"

const ChatList = ({ users = [], selectedUser, onSelectUser }) => {
  return (
    <div className={styles.container}>
      {users.map(user => (
        <div
          key={user._id}
          className={`${styles.userItem} ${selectedUser?._id === user._id ? styles.active : ""}`}
          onClick={() => onSelectUser(user)}
        >
          <img
            src={user.avatar || "/defaultAvatar.png"}
            alt={user.fullname}
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.fullname}</span>
            <span className={styles.lastDate}>
              {user.lastMessageDate ? new Date(user.lastMessageDate).toLocaleString() : ""}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList