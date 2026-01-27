import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: {type: String, enum: ["like", "comment", "follow"], required: true},
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    isRead: {type: Boolean, default: false}
  },
  {
    timestamps: true
  }
)

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification