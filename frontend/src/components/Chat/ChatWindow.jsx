// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import API from "../../api/api"
// import { getSocket } from "../../socket"
// import ChatList from "./ChatList"

// const ChatWindow = ({ initialUserId }) => {
//   const currentUser = useSelector(state => state.auth.user)

//   const [users, setUsers] = useState([])
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [messages, setMessages] = useState([])
//   const [text, setText] = useState("")

//   // Загрузка списка чатов
//   useEffect(() => {
//     if (!currentUser) return
//     const fetchChats = async () => {
//       try {
//         const res = await API.get("/messages/chats")
//         const usersData = await Promise.all(
//           res.data.map(id => API.get(`/users/${id}`).then(r => r.data))
//         )
//         setUsers(usersData)

//         // Если есть initialUserId (через params), выбираем его
//         const initialUser = usersData.find(u => u._id === initialUserId) || usersData[0]
//         setSelectedUser(initialUser || null)
//       } catch (err) {
//         console.error(err)
//       }
//     }
//     fetchChats()
//   }, [currentUser, initialUserId])

//   // Загрузка сообщений при смене выбранного пользователя
//   useEffect(() => {
//     if (!selectedUser) return
//     API.get(`/messages/${selectedUser._id}`)
//       .then(res => setMessages(res.data))
//       .catch(() => setMessages([]))
//   }, [selectedUser])

//   // Подписка на сокет
//   useEffect(() => {
//     const socket = getSocket()
//     if (!socket || !selectedUser) return

//     const handleReceive = message => {
//       if (message.sender === selectedUser._id || message.sender === currentUser._id) {
//         setMessages(prev => [...prev, message])
//       }
//     }

//     socket.on("receiveMessage", handleReceive)
//     return () => socket.off("receiveMessage", handleReceive)
//   }, [selectedUser, currentUser])

//   // Отправка сообщения
//   const handleSend = async () => {
//     if (!text.trim() || !selectedUser) return
//     try {
//       const res = await API.post("/messages", { recipient: selectedUser._id, text })
//       setMessages(prev => [...prev, res.data])
//       setText("")
//     } catch (err) {
//       console.error("Send message error:", err.response?.data || err.message)
//     }
//   }

//   if (!currentUser) return <div>Loading user...</div>

//   return (
//     <div style={{ display: "flex", padding: 20 }}>
//       <div style={{ width: 200, marginRight: 20 }}>
//         <ChatList users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
//       </div>
//       <div style={{ flex: 1 }}>
//         <h2>Chat with {selectedUser?.fullname || "..."}</h2>
//         <div style={{ border: "1px solid #ccc", height: 400, overflowY: "auto", marginBottom: 10, padding: 10 }}>
//           {messages.map(msg => (
//             <div key={msg._id} style={{ textAlign: msg.sender === currentUser._id ? "right" : "left", marginBottom: 8 }}>
//               <span>{msg.text}</span>
//             </div>
//           ))}
//         </div>
//         <div style={{ display: "flex", gap: 10 }}>
//           <input
//             value={text}
//             onChange={e => setText(e.target.value)}
//             placeholder="Write message..."
//             style={{ flex: 1 }}
//             onKeyDown={e => e.key === "Enter" && handleSend()}
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ChatWindow


import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import API from "../../api/api"
import { getSocket } from "../../socket"
import ChatList from "./ChatList"
import styles from "./chatStyles/ChatWindow.module.css"

const ChatWindow = ({ initialUserId }) => {
  const currentUser = useSelector(state => state.auth.user)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

 useEffect(() => {
  if (!currentUser) return
  const fetchChats = async () => {
    try {
      const res = await API.get("/messages/chats")
      const usersData = await Promise.all(
        res.data.map(id => API.get(`/users/${id}`).then(r => r.data))
      )

      if (initialUserId && !usersData.find(u => u._id === initialUserId)) {
        const newUser = await API.get(`/users/${initialUserId}`).then(r => r.data)
        usersData.push(newUser)
      }

      const uniqueUsers = Array.from(new Map(usersData.map(u => [u._id, u])).values())
      setUsers(uniqueUsers)

      const initialUser = uniqueUsers.find(u => u._id === initialUserId) || uniqueUsers[0]
      setSelectedUser(initialUser || null)
    } catch (err) {
      console.error(err)
    }
  }
  fetchChats()
}, [currentUser, initialUserId])

  useEffect(() => {
    if (!selectedUser) return
    API.get(`/messages/${selectedUser._id}`)
      .then(res => setMessages(res.data))
      .catch(() => setMessages([]))
  }, [selectedUser])

  useEffect(() => {
    const socket = getSocket()
    if (!socket || !selectedUser) return
    const handleReceive = message => {
      if (message.sender === selectedUser._id || message.sender === currentUser._id) {
        setMessages(prev => [...prev, message])
      }
    }
    socket.on("receiveMessage", handleReceive)
    return () => socket.off("receiveMessage", handleReceive)
  }, [selectedUser, currentUser])

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return
    try {
      const res = await API.post("/messages", { recipient: selectedUser._id, text })
      setMessages(prev => [...prev, res.data])
      setText("")
    } catch (err) {
      console.error(err.response?.data || err.message)
    }
  }

  if (!currentUser) return <div>Loading user...</div>

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {currentUser && (
        <div className={styles.myInfo}>
          <div className={styles.myAvatarWrapper}>
          <img
             src={currentUser.avatar || "/defaultAvatar.png"}
             alt={currentUser.fullname}
             className={styles.myAvatar}
           />
            </div>
          <span className={styles.myName}>{currentUser.fullname}</span>
        </div>
        )}
          <ChatList users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
       </div>

      <div className={styles.chatArea}>

        <div className={styles.chatHeader}>
           {selectedUser && (
          <div className={styles.userInfo}>
      <img
        src={selectedUser.avatar || "/defaultAvatar.png"}
        alt={selectedUser.fullname}
        className={styles.userAvatar}
      />
      <span className={styles.userName}>{selectedUser.fullname}</span>
    </div>
  )}
</div>

        <div className={styles.messages}>
          {messages.map(msg => (
            <div
              key={msg._id}
              className={msg.sender === currentUser._id ? styles.messageRight : styles.messageLeft}
            >
              <span className={styles.messageText}>{msg.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write message"
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />
          <button className={styles.sendButton} onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow