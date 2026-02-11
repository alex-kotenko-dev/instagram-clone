// import styles from './chatStyles/ChatList.module.css'

// const ChatList = ({ currentUser, users, selectedUser, onSelectUser }) => {
//   return (
//     <div className={styles.container}>
//       {/* Твой профиль сверху */}
//       <div className={styles.currentUser}>
//         <img
//           src={currentUser.avatar || '/placeholder-avatar.png'}
//           alt="Avatar"
//           className={styles.avatar}
//         />
//         <span>{currentUser.name}</span>
//       </div>

//       {/* Список пользователей */}
//       <div className={styles.usersList}>
//         {users.map((user) => (
//           <div
//             key={user._id}
//             onClick={() => onSelectUser(user)}
//             className={`${styles.userItem} ${selectedUser?._id === user._id ? styles.selected : ''}`}
//           >
//             <img
//               src={user.avatar || '/placeholder-avatar.png'}
//               alt="Avatar"
//               className={styles.avatar}
//             />
//             <span>{user.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ChatList



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
        <span>{currentUser.fullname || currentUser.name}</span>
      </div>

      <div className={styles.usersList}>
        {users.map((user) => (
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
            <span>{user.fullname || user.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList