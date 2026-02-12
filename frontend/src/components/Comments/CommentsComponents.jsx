import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { addComment, getComments } from "../../api/commentApi"
import styles from "./Comments.module.css"
import LikeButton from "../LikeButton/LikeButtonComponents"
import CommentCounter from "./CommentCounter"
import EmojiPicker from "emoji-picker-react" 

const Comments = ({ postId, postUser }) => {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.auth.user)
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")
  const [showEmoji, setShowEmoji] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments(postId)
        setComments(res?.data || [])
      } catch (err) {
        console.error("Error fetching comments:", err)
      }
    }
    fetchComments()
  }, [postId])

  const submitComment = async (e) => {
    e.preventDefault()
    if (!text.trim() || !currentUser) return

    try {
      const res = await addComment(postId, text)
      const commentData = res?.data || res
      const newComment = {
        ...commentData,
        user: commentData.user || {
          _id: currentUser._id,
          username: currentUser.username,
          avatar: currentUser.avatar
        }
      }
      setComments(prev => [...prev, newComment])
      setText("")
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }

  const onEmojiClick = (emojiData) => {
    setText(prev => prev + emojiData.emoji)
  }

  return (
    <div className={styles.container}>
      <div className={styles.listComments}>
        {comments.map(c => (
          <div key={c._id} className={styles.commentRow}>
            {c.user?.avatar && c.user._id !== postUser._id && (
              <img src={c.user.avatar} alt="" className={styles.avatar} />
            )}
            <div className={styles.commentBody}>
              <span
                className={styles.username}
                onClick={() =>
                  (c.user?._id || currentUser?._id) &&
                  navigate(`/profile/${c.user?._id || currentUser._id}`)
                }
              >
                {c.user?.username || currentUser?.username || "Deleted profile"}
              </span>
              <span>{c.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.iconRow}>
        <LikeButton postId={postId} />
        <CommentCounter postId={postId} />
      </div>

      <form onSubmit={submitComment} className={styles.form}>
        <div className={styles.inputWrapper}>

          <span
            type="button"
            onClick={() => setShowEmoji(prev => !prev)}
            className={styles.emojiButton}
          >
            😀
          </span>
          {showEmoji && (
            <div className={styles.emojiPickerWrapper}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          <input
            className={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment"
          />
        </div>

        <button className={styles.button} type="submit">Send</button>
      </form>
    </div>
  )
}

export default Comments