import API from './api'

export const getMessages = async (userId) => {
  const res = await API.get(`/messages/${userId}`)
  return res.data
}

export const sendMessage = async (recipient, text) => {
  const res = await API.post('/messages', { recipient: userId, text })
  return res.data
}

export const getMyChats = async () => {
  const res = await API.get('/messages/chats')
  return res.data
}