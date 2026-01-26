import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/:id', protect, userController.getUserProfile)
router.put('/:id', protect, upload.single('avatar'), userController.updateUserProfile)

export default router