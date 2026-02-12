// src/components/Chat/ChatWindow.jsx
import { useEffect, useState } from 'react'
import styles from './chatStyles/ChatWindow.module.css'
import API from '../../api/api'

const ChatWindow = ({ currentUser, selectedUser, socket }) => {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  // Получаем историю сообщений
  useEffect(() => {
    if (!selectedUser) return

    const fetchMessages = async () => {
      try {
        const res = await API.get(`/messages/${selectedUser._id}`)
        setMessages(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMessages()

    // Подписка на новые сообщения через сокет
    const handleReceiveMessage = (msg) => {
      if (
        (msg.sender === selectedUser._id && msg.recipient === currentUser._id) ||
        (msg.sender === currentUser._id && msg.recipient === selectedUser._id)
      ) {
        setMessages(prev => [...prev, msg])
      }
    }

    if (socket) {
      socket.on('receiveMessage', handleReceiveMessage)
    }

    return () => {
      if (socket) socket.off('receiveMessage', handleReceiveMessage)
    }
  }, [selectedUser, currentUser._id, socket])

  const handleSend = async () => {
    if (!text.trim()) return

    const msgData = { recipient: selectedUser._id, text }

    // Отправляем через сокет
    if (socket) {
      socket.emit('sendMessage', msgData)
    }

    // Локально добавляем сообщение
    setMessages(prev => [
      ...prev,
      {
        sender: currentUser._id,
        recipient: selectedUser._id,
        text,
        createdAt: new Date(),
        _id: Date.now()
      }
    ])
    setText('')
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <span>{selectedUser.fullname || selectedUser._id}</span>
      </div>

      <div className={styles.messages}>
        {messages.map(msg => (
          <div
            key={msg._id}
            className={msg.sender === currentUser._id ? styles.myMessage : styles.theirMessage}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Написать сообщение..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  )
}

export default ChatWindow