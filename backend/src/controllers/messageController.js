import Message from '../models/Message.js'

export const getMessages = async (req, res) => {
  const { userId } = req.params
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: userId },
        { sender: userId, recipient: req.user._id }
      ]
    }).sort({ createdAt: 1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const sendMessage = async (req, res) => {
  const { recipient, text } = req.body
  try {
    const message = await Message.create({
      sender: req.user._id,
      recipient,
      text
    })

    if (req.io) {
      req.io.to(recipient).emit('receiveMessage', message)
    }

    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getMyChats = async (req, res) => {
  const myId = req.user._id

  const messages = await Message.find({
    $or: [{ sender: myId }, { recipient: myId }]
  })

  const userIds = new Set()

  messages.forEach(m => {
    if (m.sender.toString() !== myId.toString())
      userIds.add(m.sender)
    if (m.recipient.toString() !== myId.toString())
      userIds.add(m.recipient)
  })

  res.json([...userIds])
}