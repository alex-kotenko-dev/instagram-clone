import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import followController from '../controllers/followController.js'

const router = express.Router()

router.post('/follow/:id', protect, followController.followUser)
router.delete('/unfollow/:id', protect, followController.unfollowUser)
router.get('/followers/:id', protect, followController.getFollowers)
router.get('/following/:id', protect, followController.getFollowing)

export default router