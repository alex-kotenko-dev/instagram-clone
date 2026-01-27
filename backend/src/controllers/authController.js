import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const registerUser = async (req, res) => {
  const {username, email, password, fullname} = req.body

  try {
    const userExists = await User.findOne({ $or: [{email}, {username}] })
    if (userExists) {
      return res.status(400).json({message: 'User already exists'})
    }
    const user = new User({username, email, password, fullname})
    await user.save()

    const token = jwt.sign(
      {userId: user._id}, 
      process.env.JWT_SECRET, 
      {expiresIn: '1h'}
    )

    const userData = user.toObject()
    delete userData.password

    res.status(201).json({token, user: userData})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message: 'Invalid credentials'})
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid credentials'})
    }

    const token = jwt.sign(
      {userId: user._id}, 
      process.env.JWT_SECRET,
      {expiresIn: '5h'}
    )

    const userData = user.toObject()
    delete userData.password

    res.status(200).json({token, user: userData})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Server Error'})
  }
}

export default {registerUser, loginUser}