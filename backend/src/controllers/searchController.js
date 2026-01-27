import User from '../models/userModel.js'
import Post  from '../models/postModel.js'

const searchUsers = async (req, res) => {
  try {
    const {q} = req.query

    if (!q) {
      return res.status(400).json({message: 'Query is required'})
    }

    const regex = new RegExp(q, 'i')

    const users = await User.find({
      $or: [{username: regex}, {fullname: regex}]
    }).select('-password')

    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

const explorePosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([{$sample: {size: 20} }])
    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

export default {searchUsers, explorePosts}