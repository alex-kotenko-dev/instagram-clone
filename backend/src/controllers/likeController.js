import Like from '../models/likeModel.js'


 const likePost = async (req, res) => {
  try {
    const post = await Like.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    
    if (!post.likes.includes(req.user.userId)) {
      post.likes.push(req.user.userId)
      await post.save()
    }

    res.status(200).json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server error'})
  }
 }

 const unlikePost = async (req, res) => {
   try {
     const post = await Like.findById(req.params.id)
 
     if (!post) {
       return res.status(404).json({message:'Post not found'})
     }
 
     post.likes = post.likes.filter(
       (id) => id.toString() !== req.user.userId
     )
 
     await post.save()
     res.status(200).json(post)
   } catch (error) {
     console.error(error)
     res.status(500).json({message: 'Server Error'})
   }
  }

  const getPostLikes = async (req, res) => {
    try {
      const likes = await Like.find({post: req.params.id}).populate('user', 'username avatar')
      res.status(200).json(likes)
    } catch (error) {
      console.error(error)
      res.status(500).json({message: 'Server Error'})
    }
  }

export default {likePost, unlikePost, getPostLikes}