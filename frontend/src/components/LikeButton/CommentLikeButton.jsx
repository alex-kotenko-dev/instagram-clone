import { useState } from "react"
import { useSelector } from "react-redux"
import { FaHeart } from "react-icons/fa"
import { likeComment, unlikeComment } from "../../api/likeApi"

const CommentLikeButton = ({ commentId, initialLikes, initialLiked }) => {
  const userId = useSelector(state => state.auth.user?._id)
  const [likes, setLikes] = useState(initialLikes || 0)
  const [liked, setLiked] = useState(initialLiked || false)

  const toggleLike = async () => {
    try {
      if (liked) {
        await unlikeComment(commentId)
        setLikes(prev => prev - 1)
      } else {
        await likeComment(commentId)
        setLikes(prev => prev + 1)
      }
      setLiked(!liked)
    } catch (err) {
      console.error("Comment like error:", err)
    }
  }

  return (
    <button
      onClick={toggleLike}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 14,
        color: liked ? "#ed4956" : "#999"
      }}
    >
      <FaHeart />
      {likes}
    </button>
  )
}

export default CommentLikeButton