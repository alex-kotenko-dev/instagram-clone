import Comment from '../models/commentModel.js'
import Post from '../models/postModel.js'
import Notification from '../models/notificationModel.js'


const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    } 
    
    const comment = await Comment.create({
      user: req.user.userId,
      post: req.params.id,
      text: req.body.text
    })

    if (post.user.toString() !== req.user.userId) {
      await Notification.create({
        user: post.user,
        fromUser: req.user.userId,
        type: 'comment',
        post: post._id
    })
    }

    res.status(201).json(post)
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

    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({message: 'Not allowed'})
    } 

    if (comment.user.toString() !== req.user.userId && post.user.toString() !== req.user.userId) {
      return res.status(403).json({message: 'Not allowed'})
    }
  } catch (error) {
      console.error(error)
      res.status(500).json({message: 'Server Error'})
   }
 }

 export default {commentPost, getPostComments, deleteComment}