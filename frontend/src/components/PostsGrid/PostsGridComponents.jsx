import { useNavigate, useLocation } from "react-router-dom"
import styles from './PostsGrid.module.css'

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
            navigate(`/posts/${post._id}`, {
              state: { background: location }
            })
          }
        >
          <img src={post.image} alt="" />
        </div>
      ))}
    </div>
  )
}

export default PostsGrid
