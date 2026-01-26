import express from "express"
import protect from '../middlewares/authMiddleware.js'
import commentController from '../controllers/commentController.js'

const router = express.Router()

router.post('/:id/comment', protect, commentController.commentPost)
router.get('/:id', protect, commentController.getPostComments)
router.delete('/:id', protect, commentController.deleteComment)

export default router