import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './chatStyles/MessageInput.module.css'

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        className={styles.input}
      />
      <button onClick={() => navigate(`/profile/${selectedUser._id}`)} className={styles.button}>
        Отправить
      </button>
    </div>
  )
}

export default MessageInput