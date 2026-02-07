import { useEffect, useState } from "react"
import { addComment, getComments } from "../../api/commentApi"
import styles from "./Comments.module.css"
import LikeButton from "../LikeButton/LikeButtonComponents"
import { FaRegComment } from "react-icons/fa"

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
    <div className={styles.container}>
      <div className={styles.listComments}>
        {comments.map(c => (
          <p key={c._id}>
            <b>{c.user.username}</b> {c.text}
          </p>
        ))}
      </div>

      <div>
       <div className={styles.iconRow}>
         <LikeButton postId={postId} />
         <FaRegComment className={styles.icon} />
       </div>

       <form onSubmit={submitComment} className={styles.form}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
        />
        <button className={styles.button} type="submit">Send</button>
      </form>
      </div>
      
    </div>
  )
}

export default Comments
