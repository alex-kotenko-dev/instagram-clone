import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getPostById } from "../../api/postsApi"
import PostCard from "../../components/PostCard/PostCard"

const PostPage = () => {
  const { id } = useParams()
  const currentUserId = useSelector(state => state.auth.user?._id)
  const [post, setPost] = useState(null)

  useEffect(() => {
    getPostById(id)
    .then(res => setPost(res.data))
    .catch(() => setPost(null))
  }, [id])

  if (!post) return <p>Loading...</p>

  const handlePostDeleted = () => {
    setPost(null)
  }

  return (
    <div>
      <PostCard
        post={post} currentUserId={currentUserId}/>
    </div>
  )
}

export default PostPage
