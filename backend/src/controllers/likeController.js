import Like from '../models/likeModel.js'
import Post from '../models/postModel.js'
import Notification from '../models/notificationModel.js'
import { io } from '../server.js'


 const likePost = async (req, res) => {
  try {
    const postId = req.params.id
    const userId = req.user._id

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    
    const existingLike = await Like.findOne({post: postId, user: userId})
    if (existingLike) {
      return res.status(400).json({message: 'You already liked this post'})
    }

    const like = await Like.create({
      user: userId,
      post: postId
    })

    if (post.user.toString() !== userId.toString) {
      const notification = await Notification.create({
        user: post.user, 
        fromUser: userId,
        type: "like",
        post: postId
      })

      io.to(post.user.toString()).emit('new_notification', notification)
    }

    res.status(200).json(like)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server error'})
  }
 }

 const unlikePost = async (req, res) => {
   try {
     const postId = req.params.id
     const userId = req.user._id

     const like = await Like.findOneAndDelete({post: postId, user: userId})
     if (!like) return res.status(404).json({ message: 'Like not found' })
 
     if (!like) {
       return res.status(404).json({message:'Like not found'})
     }
 
     res.status(200).json(like)
   } catch (error) {
     console.error(error)
     res.status(500).json({message: 'Server Error'})
   }
  }

  const getPostLikes = async (req, res) => {
    try {
      const postId = req.params.id

      const likes = await Like.find({post: postId})
      .populate('user', 'username avatar')

      res.status(200).json(likes)
    } catch (error) {
      console.error(error)
      res.status(500).json({message: 'Server Error'})
    }
  }

export default {likePost, unlikePost, getPostLikes}