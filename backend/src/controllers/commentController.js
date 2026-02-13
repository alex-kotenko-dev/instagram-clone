import Comment from '../models/commentModel.js'
import Post from '../models/postModel.js'
import Notification from '../models/notificationModel.js'
import { io } from '../server.js'


const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    } 

    const userId = req.user._id
    if (!userId) return res.status(401).json({ message: 'Unauthorized' })
    
    const comment = await Comment.create({
      user: userId,
      post: req.params.id,
      text: req.body.text
    })

    if (post.user.toString() !== req.user.userId) {
      const notification = await Notification.create({
        user: post.user,
        fromUser: userId,
        type: 'comment',
        post: post._id
    })

      io.to(post.user.toString()).emit("new_notification", notification)
    }

    res.status(201).json(comment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
 }

 const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({post: req.params.id})
    .populate('user', 'username avatar')
    
    res.status(200).json(comments)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
 }

 const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)

    if(!comment) {
      return res.status(404).json({message: 'Comment not found'})
    }

    const post = await Post.findById(comment.post)

    if (
      comment.user.toString() !== req.user.userId &&
      post.user.toString() !== req.user.userId
    ) {
      return res.status(403).json({message: 'Not allowed'})
    } 

    await comment.deleteOne()

    res.status(200).json({message: 'Comment deleted'})
  } catch (error) {
      console.error(error)
      res.status(500).json({message: 'Server Error'})
   }
 }

 export default {commentPost, getPostComments, deleteComment}