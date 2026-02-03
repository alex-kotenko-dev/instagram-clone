import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPostById } from "../../api/postsApi"

import LikeButton from "../../components/LikeButton/LikeButtonComponents"
import Comments from "../../components/Comments/CommentsComponents"

const PostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    getPostById(id).then(res => setPost(res.data))
  }, [id])

  if (!post) return <p>Loading...</p>

  return (
    <div>
      <img src={post.image} alt="post" width={400} />
      <p>{post.text}</p>

      <LikeButton postId={post._id} />
      <Comments postId={post._id} />
    </div>
  )
}

export default PostPage
