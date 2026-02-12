// src/components/Chat/ChatList.jsx
import styles from './chatStyles/ChatList.module.css'

const ChatList = ({ currentUser, users, selectedUser, onSelectUser }) => {
  return (
    <div className={styles.container}>
      <div className={styles.currentUser}>
        <img
          src={currentUser.avatar || '/placeholder-avatar.png'}
          alt="Avatar"
          className={styles.avatar}
        />
        <span>{currentUser.fullname || currentUser._id}</span>
      </div>

      <div className={styles.usersList}>
        {users.map(user => (
          <div
            key={user._id}
            onClick={() => onSelectUser(user)}
            className={`${styles.userItem} ${selectedUser?._id === user._id ? styles.selected : ''}`}
          >
            <img
              src={user.avatar || '/placeholder-avatar.png'}
              alt="Avatar"
              className={styles.avatar}
            />
            <span>{user.fullname || user._id}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList