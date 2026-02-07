import express from "express"
import protect from '../middlewares/authMiddleware.js'
import postController from '../controllers/postController.js'
import multer from "multer"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', protect, upload.single('image'), postController.createPost)
router.get('/', protect, postController.getPosts)
router.get('/user/:id', postController.getUserPosts)
router.patch("/:id", protect, upload.single('image'), postController.editPost)
router.delete('/:id', protect, postController.deletePost)
router.get('/:id', postController.getPostById)

export default router