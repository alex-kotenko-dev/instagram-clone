import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { likePost, unlikePost, getLikes } from "../../api/likeApi"

const LikeButton = ({ postId }) => {
  const userId = useSelector(state => state.auth.user?._id)
  const [likes, setLikes] = useState([])

  useEffect(() => {
    getLikes(postId).then(res => setLikes(res.data))
  }, [postId])

  const isLiked = likes.some(like => like.user._id === userId)

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(postId)
      } else {
        await likePost(postId)
      }

      const res = await getLikes(postId)
      setLikes(res.data)
    } catch (err) {
      console.error("Like error:", err)
    }
  }

  return (
    <button onClick={toggleLike}>
      {isLiked ? "❤️" : "🤍"} {likes.length}
    </button>
  )
}

export default LikeButton
