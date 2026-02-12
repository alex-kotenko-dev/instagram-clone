import styles from "./chatStyles/ChatWindow.module.css"
import MessageInput from "./MessageInput"

const ChatWindow = ({ currentUser, messages, onSend }) => {
  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map(msg => (
          <div
            key={msg._id}
            className={`${styles.row} ${
              msg.sender === currentUser._id
                ? styles.myRow
                : styles.theirRow
            }`}
          >
            <div className={styles.message}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <MessageInput onSend={onSend} />
    </div>
  )
}

export default ChatWindow