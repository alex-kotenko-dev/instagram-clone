import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Follow from '../models/followModel.js'

const getUserProfile = async (req, res) => {
  try {
    const id = req.params.id === 'me' || !req.params.id
    ? req.user.userId
    : req.params.id

    if (!id) {
      return res.status(401).json({message: 'Unauthorized'})
    }

    const user = await User.findById(id).select('-password')
    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    const postsCount = await Post.countDocuments({ user: id })
    const followersCount = await Follow.countDocuments({ following: id })
    const followingCount = await Follow.countDocuments({ follower: id })

    res.status(200).json({
      ...user.toObject(),
      postsCount,
      followersCount,
      followingCount
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    user.fullname = req.body.fullname || user.fullname
    user.bio = req.body.bio || user.bio
    
    if (req.file) {
      const base64Image = req.file.buffer.toString('base64')
      user.avatar = `data:${req.file.mimetype};base64,${base64Image}`
    }

    await user.save()

    const userData = user.toObject()
    delete userData.password

    res.status(200).json(userData)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

export default {getUserProfile, updateUserProfile}