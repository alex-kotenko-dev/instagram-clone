import { useState } from "react"
import styles from "./chatStyles/MessageInput.module.css"

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("")

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text)
    setText("")
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        placeholder="Write message..."
      />
      <button className={styles.button} onClick={handleSend}>
        Send
      </button>
    </div>
  )
}

export default MessageInput