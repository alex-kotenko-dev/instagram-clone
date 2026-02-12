// src/pages/Message/MessagePage.jsx
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatList from '../../components/Chat/ChatList'
import ChatWindow from '../../components/Chat/ChatWindow'
import { connectSocket, getSocket } from '../../socket'
import API from '../../api/api'
import styles from './PageMessages.module.css'

const MessagePage = () => {
  const { token } = useSelector(s => s.auth)
  const { profile } = useSelector(s => s.profile)

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  // Подключаем сокет
  useEffect(() => {
    if (token) {
      connectSocket(token)
    }
  }, [token])

  const socket = getSocket()

  // Подгружаем список чатов (userId)
  useEffect(() => {
    if (!token || !profile) return

    const fetchChats = async () => {
      try {
        const res = await API.get('/messages/chats')
        const userIds = res.data

        // Подтягиваем данные о каждом пользователе
        const usersData = await Promise.all(
          userIds.map(async id => {
            const userRes = await API.get(`/users/${id}`)
            return userRes.data
          })
        )
        setUsers(usersData)
        if (!selectedUser && usersData.length) {
          setSelectedUser(usersData[0])
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchChats()
  }, [token, profile])

  if (!profile) return <div>Loading profile...</div>

  return (
    <div className={styles.container}>
      <ChatList
        currentUser={profile}
        users={users}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      {selectedUser ? (
        <ChatWindow
          currentUser={profile}
          selectedUser={selectedUser}
          token={token}
          socket={socket}
        />
      ) : (
        <div className={styles.empty}>Выберите чат</div>
      )}
    </div>
  )
}

export default MessagePage