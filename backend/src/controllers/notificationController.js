import Notification from '../models/notificationModel.js'

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId

    const notifications = await Notification.find({user: userId})
    .populate('fromUser', 'username fullname avatar')
    .sort({createdAt: -1})

    res.status(200).json(notifications)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

export default {getNotifications}