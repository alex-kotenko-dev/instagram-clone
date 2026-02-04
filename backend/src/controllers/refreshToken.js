import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const refreshToken = async (req, res) => {
  const { token } = req.body
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user || !user.refreshTokens.includes(token)) {
      return res.status(403).json({ message: 'Invalid refresh token' })
    }

    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({ token: newAccessToken })
  } catch (error) {
    console.error(error)
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

export default { refreshToken }
