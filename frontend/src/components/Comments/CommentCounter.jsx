import { useEffect, useState } from "react"
import { getComments } from "../../api/commentApi"
import { FaRegComment } from "react-icons/fa"

const CommentCounter = ({ postId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(postId).then(res => setComments(res.data))
  }, [postId])

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 18,
      cursor: "pointer"
    }}>
      <FaRegComment />
      {comments.length}
    </div>
  )
}

export default CommentCounter