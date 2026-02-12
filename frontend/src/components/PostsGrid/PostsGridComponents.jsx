import { useNavigate, useLocation } from "react-router-dom"
import styles from './PostsGrid.module.css'
import LikeButton from '../../components/LikeButton/LikeButtonComponents'
import CommentCounter from '../../components/Comments/CommentCounter'

const PostsGrid = ({ posts }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
     <div className={styles.grid}>
      {posts.map(post => (
        <div
          key={post._id}
          className={styles.item}
          onClick={() =>
            navigate(`/posts/${post._id}`, { state: { background: location } })
          }
        >
          <img className={styles.itemImg} src={post.image} alt="" />
          <div className={styles.overlay}>
            <div className={styles.overlayIcon}>
              <LikeButton postId={post._id} />
            </div>
            <div className={styles.overlayIcon}>
              <CommentCounter postId={post._id} />
            </div>
          </div>
        </div>
  ))}
</div>
  )
}

export default PostsGrid
