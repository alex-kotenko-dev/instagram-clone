import { useNavigate, useLocation } from "react-router-dom"
import LikeButton from "../../components/LikeButton/LikeButtonComponents"
import styles from "./PostCardCompact.module.css"
import CommentCounter from "../../components/Comments/CommentCounter"

const PostCardCompact = ({ post }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const openPost = () => {
    navigate(`/posts/${post._id}`, {
      state: { background: location }
    })
  }

  return (
    <div className={styles.card}>
      
      <img
        src={post.image}
        className={styles.image}
        onClick={openPost}
      />

      <div className={styles.body}>
        <div className={styles.userBlock}>
          {post.user?.avatar && (
           <img
           src={post.user.avatar}
           className={styles.avatar}
           />
         )}
         <span className={styles.userName}>{post.user?.username}</span>
       </div>

        <LikeButton postId={post._id} />
        <CommentCounter postId={post._id} />

        <div className={styles.avatars}>
          {post.comments?.slice(0,3).map((c,i)=>(
            <img key={i} src={c.user?.avatar} className={styles.ava}/>
          ))}
        </div>
      </div>

    </div>
  )
}

export default PostCardCompact