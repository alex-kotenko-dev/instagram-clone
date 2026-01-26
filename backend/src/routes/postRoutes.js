import express from "express"
import protect from '../middlewares/authMiddleware.js'
import postController from '../controllers/postController.js'

const router = express.Router()

router.post('/', protect, postController.createPost)
router.get('/', protect, postController.getPosts)
router.delete('/:id', protect, postController.deletePost)
router.put("/:id", protect, postController.editPost)
router.get('/user/:id', protect, postController.getUserPosts)
router.get('/:id', protect, postController.getPostById)

export default router