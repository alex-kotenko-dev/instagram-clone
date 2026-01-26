import express from "express"
import protect from '../middlewares/authMiddleware.js'
import likeController from '../controllers/likeController.js'

const router = express.Router()

router.post('/:id/like', protect, likeController.likePost)
router.post("/:id/unlike", protect, likeController.unlikePost)
router.get('/:id', protect, likeController.getPostLikes)

export default router