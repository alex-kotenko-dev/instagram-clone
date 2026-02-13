// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { useSelector } from "react-redux"
// import API from "../../api/api"
// import { getSocket } from "../../socket"
// import ChatList from "../../components/Chat/ChatList"

// const MessagePage = () => {
//   const { userId } = useParams()
//   const currentUser = useSelector(state => state.auth.user)

//   const [users, setUsers] = useState([])
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [messages, setMessages] = useState([])
//   const [text, setText] = useState("")

//   useEffect(() => {
//     if (!currentUser) return
//     const fetchChats = async () => {
//       try {
//         const res = await API.get("/messages/chats")
//         const usersData = await Promise.all(
//           res.data.map(id => API.get(`/users/${id}`).then(r => r.data))
//         )
//         setUsers(usersData)
//         if (usersData.length) setSelectedUser(usersData[0])
//       } catch (err) {
//         console.error(err)
//       }
//     }
//     fetchChats()
//   }, [currentUser])

//   useEffect(() => {
//     if (!selectedUser) return
//     API.get(`/messages/${selectedUser._id}`)
//       .then(res => setMessages(res.data))
//       .catch(() => setMessages([]))
//   }, [selectedUser])

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
//         <div>
//           <input value={text} onChange={e => setText(e.target.value)} placeholder="Write message..." />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MessagePage




import { useParams } from "react-router-dom"
import ChatWindow from "../../components/Chat/ChatWindow"

const MessagePage = () => {
  const { userId } = useParams()

  return <ChatWindow initialUserId={userId} />
}

export default MessagePage