import express from "express"
import protect from '../middlewares/authMiddleware.js'
import searchController from '../controllers/searchController.js'

const router = express.Router()

router.get('/user', protect, searchController.searchUsers)
router.get('/explore', protect, searchController.explorePosts)

export default router