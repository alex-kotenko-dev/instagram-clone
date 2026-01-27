import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import notificationController from '../controllers/notificationController.js'

const router = express.Router()

router.get('/', protect, notificationController.getNotifications)

export default router