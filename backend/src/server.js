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

import http from 'http'
import {Server} from 'socket.io'
import jwt from 'jsonwebtoken'

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


const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) return next(new Error('No token'))

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    socket.userId = decoded.userId
    next()
  } catch (error) {
    next(new Error('Invalid token'))
  }
})

io.on('connection', (socket) => {
  console.log('User connected', socket.userId)
  socket.join(socket.userId)

  socket.on('disconnect', () => {
    console.log('User disconnect:', socket.userId)
  })
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