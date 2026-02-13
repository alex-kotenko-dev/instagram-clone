import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Comments from "../Comments/CommentsComponents"
import { deletePost, editPost } from "../../api/postsApi"
import PostActionsModal from "./PostActionsModal/PostActionsModal"
import styles from "./PostCard.module.css"

const PostCard = ({ post, currentUserId }) => {
  const navigate = useNavigate()

  const userIdFromPost = post.user?._id
  const isOwner = String(currentUserId) === String(userIdFromPost)

  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editText, setEditText] = useState(post.text)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deletePost(post._id)
      navigate(`/profile/${currentUserId}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("text", editText)
      await editPost(post._id, formData)
      setIsEditing(false)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/posts/${post._id}`
    )
    setShowModal(false)
  }

  return (
  <div className={styles.card}>
     {post.image && (
      <div className={styles.left}>
        <img src={post.image} alt="" className={styles.image} />
      </div>
     )}

      <div className={styles.right}>

       <div className={styles.header}>

        <div className={styles.userBlock}>
          {post.user?.avatar && (
         <img
           src={post.user.avatar}
           alt=""
          className={styles.avatar}
         />
        )}
        <div className={styles.username}>
         {post.user?.username || "Deleted profile"}
        </div>
      </div>

         {isOwner && (
          <button
            className={styles.dots}
            onClick={(e) => {
              e.stopPropagation()
              setShowModal(true) }}>
            ⋯
          </button>
          )}
       </div>

       {isEditing ? (
        <>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className={styles.textarea}
          />
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        </>
       ) : (
         <p className={styles.text}>{post.text}</p>
       )}

        <div className={styles.commentsList}>
          <Comments postId={post._id} postUser={post.user}/>
        </div>
      </div> 

     {showModal && (
      <PostActionsModal
        onClose={() => setShowModal(false)}
        onEdit={() => {
          setIsEditing(true)
          setShowModal(false)
        }}
        onDelete={handleDelete}
        onCopy={handleCopy}
      />
     )}
  </div>
 )
}

export default PostCard