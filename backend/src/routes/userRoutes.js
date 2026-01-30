import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/me', protect, userController.getUserProfile)
router.get('/:id', userController.getUserProfile)
router.patch('/me', protect, upload.single('avatar'), userController.updateUserProfile)

export default router