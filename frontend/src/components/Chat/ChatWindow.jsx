// import { useEffect, useState } from 'react'
// import { getSocket } from '../../socket' 
// import { getMessages, sendMessage } from '../../api/messageApi'
// import { useNavigate } from 'react-router-dom'
// import styles from './chatStyles/ChatWindow.module.css'

// const ChatWindow = ({ currentUser, selectedUser, token }) => {
//   const [messages, setMessages] = useState([])
//   const [text, setText] = useState('')
//   const navigate = useNavigate()

//   const socket = getSocket()

//   useEffect(() => {
//     if (!selectedUser) return

//     const fetchMessages = async () => {
//       try {
//         const msgs = await getMessages(selectedUser._id)
//         setMessages(msgs)
//       } catch (e) {
//         console.error(e)
//       }
//     }

//     fetchMessages()

//     // Подписка на новые сообщения через сокет
//     const handleReceiveMessage = (msg) => {
//       if (
//         (msg.sender === selectedUser._id && msg.recipient === currentUser._id) ||
//         (msg.sender === currentUser._id && msg.recipient === selectedUser._id)
//       ) {
//         setMessages(prev => [...prev, msg])
//       }
//     }

//     socket.on('receiveMessage', handleReceiveMessage)

//     return () => {
//       socket.off('receiveMessage', handleReceiveMessage)
//     }
//   }, [selectedUser, currentUser._id, socket])

//   const handleSend = async () => {
//     if (!text.trim()) return
//     try {
//       socket.emit('sendMessage', {
//         recipient: selectedUser._id,
//         text
//       })

//       // Можно сразу добавить сообщение в интерфейс
//       setMessages(prev => [
//         ...prev,
//         {
//           sender: currentUser._id,
//           recipient: selectedUser._id,
//           text,
//           createdAt: new Date(),
//           _id: Date.now() // временный id для фронта
//         }
//       ])
//       setText('')
//     } catch (e) {
//       console.error(e)
//     }
//   }

//   return (
//    <div className={styles.chatContainer}>
//       <div className={styles.header}>
//         <div>
//           <img src={selectedUser.avatar || '/default-avatar.png'} alt="" className={styles.avatar} />
//           <span>{selectedUser.fullname || selectedUser._id}</span>
//         </div>
//         <button onClick={() => navigate(`/profile/${selectedUser._id}`)}>Профиль</button>
//       </div>

//       <div className={styles.messages}>
//         {messages.map(m => (
//           <div
//             key={m._id}
//             className={m.sender === currentUser._id ? styles.myMessage : styles.theirMessage}
//           >
//             {m.text}
//           </div>
//         ))}
//       </div>

//       <div className={styles.inputContainer}>
//         <input
//           type="text"
//           value={text}
//           onChange={e => setText(e.target.value)}
//           placeholder="Написать сообщение..."
//         />
//         <button onClick={handleSend}>Отправить</button>
//       </div>
//     </div>
//   )
// }

// export default ChatWindow



import { useEffect, useState } from 'react'
import { getSocket } from '../../socket'
import { getMessages } from '../../api/messageApi'
import { useNavigate } from 'react-router-dom'
import styles from './chatStyles/ChatWindow.module.css'

const ChatWindow = ({ currentUser, selectedUser, token }) => {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const socket = getSocket()

  useEffect(() => {
    if (!selectedUser) return

    const fetchMessages = async () => {
      try {
        const msgs = await getMessages(selectedUser._id)
        setMessages(msgs)
      } catch (e) {
        console.error(e)
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

    socket?.on('receiveMessage', handleReceiveMessage)

    return () => {
      socket?.off('receiveMessage', handleReceiveMessage)
    }
  }, [selectedUser, currentUser._id, socket])

  const handleSend = async () => {
    if (!text.trim()) return

    try {
      socket?.emit('sendMessage', {
        recipient: selectedUser._id,
        text
      })

      setMessages(prev => [
        ...prev,
        {
          sender: currentUser._id,
          recipient: selectedUser._id,
          text,
          createdAt: new Date(),
          _id: Date.now() // временный ID для фронта
        }
      ])

      setText('')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <div>
          <img src={selectedUser.avatar || '/default-avatar.png'} alt="" className={styles.avatar} />
          <span>{selectedUser.fullname || selectedUser._id}</span>
        </div>
        <button onClick={() => navigate(`/profile/${selectedUser._id}`)}>Профиль</button>
      </div>

      <div className={styles.messages}>
        {messages.map(m => (
          <div
            key={m._id}
            className={m.sender === currentUser._id ? styles.myMessage : styles.theirMessage}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Написать сообщение..."
          onKeyPress={e => { if (e.key === 'Enter') handleSend() }}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  )
}

export default ChatWindow