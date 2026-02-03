import Notification from '../models/notificationModel.js'

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId

    const notifications = await Notification.find({ user: userId })
      .populate('fromUser', 'username fullname avatar')
      .sort({ createdAt: -1 })

    res.status(200).json(notifications)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    )

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    res.status(200).json(notification)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export default { getNotifications, markAsRead }
