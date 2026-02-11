import express from 'express'
import { getMessages, sendMessage, getMyChats } from '../controllers/messageController.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/chats', protect, getMyChats)
router.get('/:userId', protect, getMessages)
router.post('/', protect, sendMessage)

export default router
