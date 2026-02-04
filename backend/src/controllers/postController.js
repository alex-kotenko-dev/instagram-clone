 import Post from '../models/postModel.js'

 const createPost = async(req, res) => {
  try {
    const text = req.body.text || ""
    let image = ""

    if (req.file) {
      const mime = req.file.mimetype
      const base64 = req.file.buffer.toString("base64");
      image = `data:${mime};base64,${base64}`
    }

    const post = new Post({
      user: req.user.userId,
      text,
      image
    })

    await post.save()
    res.status(201).json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
 }

 const getPosts = async(req, res) => {
  try {
    const posts = await Post.find()
    .populate('user', 'username fullname avatar')
    .populate('comments.user', 'username avatar')
    .sort({createdAt: -1})
    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server error'})
  }
 }

 const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({message: 'Not allowed'})
    }

    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({message: 'Post deleted'})
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
 }

 const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({message: 'Not allowed'})
    }

    post.text = req.body.text || post.text
    post.image = req.body.image || post.image

    await post.save()
    res.status(200).json(post)
  } catch (error) {
    console.error(error) 
    res.status(500).json({ message: 'Server Error' })
  }
 }

 const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({user: req.params.id})
    .populate('user', 'username fullname avatar')
    .populate('comments.user', 'username avatar')
    .sort({createdAt: -1})

    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server error'})
  }
 }

 const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    .populate('user', 'username fullname avatar')
    .populate('comments.user', 'username avatar')

    if (!post) {
      return res.status(404).json({message: 'Post not found'})
    }

    res.status(200).json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server error'})
  }
 }

export default {createPost, getPosts, deletePost, editPost, getUserPosts, getPostById}