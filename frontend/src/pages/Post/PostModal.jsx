import { useNavigate } from "react-router-dom"
import PostPage from "./PostPage"
import styles from "./PostPage.module.css"

const PostModal = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.overlay} onClick={() => navigate(-1)}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <PostPage />
      </div>
    </div>
  )
}

export default PostModal
