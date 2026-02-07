import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { likePost, unlikePost, getLikes } from "../../api/likeApi"
import { FaHeart, FaRegHeart } from "react-icons/fa"

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
    <button onClick={toggleLike}
    style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 18
      }}
    >
      {isLiked ? (<FaHeart color="#ff3040"/>
        ) : (
      <FaHeart/>
      )} 

      {likes.length}
    </button>
  )
}

export default LikeButton
