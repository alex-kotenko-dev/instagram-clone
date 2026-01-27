import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import protect from './middlewares/authMiddleware.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import followRoutes from './routes/followRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/comments', commentRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/follow", followRoutes)
app.use("/api/notifications", notificationRoutes)


app.get('/api/protected', protect, (req, res) => {
  res.json({message: 'This is a protected route', user: req.user})
})

app.get('/', (req, res) => {
  res.send('API is running')
})

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`)
    })
  } catch (error) {
    console.error(`Error starting the server:`, error)
    process.exit(1)
  }
}

start()