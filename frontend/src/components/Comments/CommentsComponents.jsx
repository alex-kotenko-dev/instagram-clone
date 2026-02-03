import { useEffect, useState } from "react"
import { addComment, getComments } from "../../api/commentApi"

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    getComments(postId).then(res => setComments(res.data))
  }, [postId])

  const submitComment = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    const res = await addComment(postId, text)
    setComments(prev => [...prev, res.data])
    setText("")
  }

  return (
    <div>
      <div>
        {comments.map(c => (
          <p key={c._id}>
            <b>{c.user.username}</b> {c.text}
          </p>
        ))}
      </div>

      <form onSubmit={submitComment}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Comments
