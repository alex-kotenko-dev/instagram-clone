import LikeButton from "../LikeButton/LikeButtonComponents"
import Comments from "../Comments/CommentsComponents"

const PostCard = ({ post }) => {
  return (
    <div>
      <img src={post.image} width={300} />
      <p>{post.text}</p>

      <LikeButton postId={post._id} />
      <Comments postId={post._id} />
    </div>
  )
}

export default PostCard
