import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const registerUser = async (req, res) => {
  const {username, email, password, fullname} = req.body

  try {
    const userExists = await User.findOne({ $or: [{email}, {username}] })
    if (userExists) return res.status(400).json({message: 'User already exists'})

    const user = new User({username, email, password, fullname})
    await user.save()

    const accessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '5h'})
    const refreshToken = jwt.sign({userId: user._id}, process.env.REFRESH_SECRET, {expiresIn: '7d'})

    const userData = user.toObject()
    delete userData.password

    res.status(201).json({token: accessToken, refreshToken, user: userData})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.findOne({ $or: [{email}, {username: email}] })
    if (!user) return res.status(400).json({message: 'Invalid credentials'})

    const isMatch = await user.matchPassword(password)
    if (!isMatch) return res.status(400).json({message: 'Invalid credentials'})

    const accessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '5h'})
    const refreshToken = jwt.sign({userId: user._id}, process.env.REFRESH_SECRET, {expiresIn: '7d'})

    const userData = user.toObject()
    delete userData.password

    res.status(200).json({token: accessToken, refreshToken, user: userData})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

const refreshToken = async (req, res) => {
  const { token } = req.body
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET)
    const user = await User.findById(payload.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const newAccessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '5h'})
    res.json({ token: newAccessToken })
  } catch (err) {
    console.error(err)
    res.status(403).json({ message: 'Invalid refresh token' })
  }
}

export default {registerUser, loginUser, refreshToken}