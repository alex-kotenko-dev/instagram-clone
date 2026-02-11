import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatList from '../../components/Chat/ChatList'
import ChatWindow from '../../components/Chat/ChatWindow'
import API from '../../api/api'
import styles from './PageMessages.module.css'

const PageMessages = () => {
  const { user, token } = useSelector(s => s.auth)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])

  if (!user) return <div>Loading...</div>

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await API.get('/messages/chats')
        setUsers(res.data)
      } catch (err) {
        console.error('Failed to fetch chats:', err)
      }
    }
    fetchChats()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.chatList}>
        <ChatList
          currentUser={user}
          users={users}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      </div>

      <div className={styles.chatWindow}>
        {selectedUser ? (
          <ChatWindow
            currentUser={user}
            selectedUser={selectedUser}
            token={token}
          />
        ) : (
          <div className={styles.empty}>Выберите чат</div>
        )}
      </div>
    </div>
  )
}

export default PageMessages