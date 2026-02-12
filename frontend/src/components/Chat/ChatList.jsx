import styles from "./chatStyles/ChatList.module.css"

const ChatList = ({ users, selectedUser, onSelectUser }) => {
  return (
    <div className={styles.container}>
      {users.map(user => (
        <div
          key={user._id}
          className={`${styles.user} ${
            selectedUser?._id === user._id ? styles.active : ""
          }`}
          onClick={() => onSelectUser(user)}
        >
          {user.fullname}
        </div>
      ))}
    </div>
  )
}
export default ChatList