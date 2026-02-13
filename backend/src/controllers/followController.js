import Follow from '../models/followModel.js'
import User from '../models/userModel.js'
import Notification from '../models/notificationModel.js'
import { io } from '../server.js'


const followUser = async (req, res) => {
  try {
    const followerId = req.user._id
    const followingId = req.params.id

    if (followerId.toString() === followingId.toString()) {
      return res.status(400).json({message: 'You cannot follow yourself'})
    }

    const userExists = await User.findById(followingId)
    if (!userExists) {
      return res.status(404).json({message: 'User not found'})
    }

    const alreadyFollow = await Follow.findOne({
      follower: followerId,
      following: followingId
    })

    if (alreadyFollow) {
      return res.status(400).json({message:'You already follow this user'})
    }

    const follow = new Follow({
      follower: followerId,
      following: followingId
    })

    await follow.save()

    const notification = await Notification.create({
      user: followingId,
      fromUser: followerId,
      type: 'follow'
    })
     
    io.to(followingId.toString()).emit("new_notification", notification)

    res.status(201).json({message: 'Followed successfully'})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user._id
    const followingId = req.params.id

    const follow = await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId
    })

    if (!follow) {
      return res.status(404).json({message: 'Follow not found'})
    }

    res.status(200).json({message: 'Unfollowed successfully'})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

const getFollowers = async (req, res) => {
  try {
    const userId = req.params.id

    const followers = await Follow.find({following: userId})
    .populate('follower', '-password')
    .exec()

    res.status(200).json(followers)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

const getFollowing = async (req, res) => {
  try {
    const userId = req.params.id

    const following = await Follow.find({follower: userId})
    .populate('following', '-password')
    .exec()
    
    res.status(200).json(following)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

export default { followUser, unfollowUser, getFollowers, getFollowing }