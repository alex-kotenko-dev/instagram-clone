import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PostCard from "../PostCard/PostCard"
import { getPosts } from "../../api/postsApi"
import { getFollowing } from "../../api/followApi"

const PostFeed = ({ filter }) => {
  const userId = useSelector(state => state.auth.user?._id)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        let allPosts = await getPosts() 
        if (filter === "following") {
          const res = await getFollowing(userId)
          const followingIds = res.data.map(f => f.following._id)
          allPosts = allPosts.data.filter(p => followingIds.includes(p.user._id))
        } else {
          allPosts = allPosts.data
        }
        setPosts(allPosts)
      } catch (err) {
        console.error("Error fetching posts:", err)
      } finally {
        setLoading(false)
      }
    }

    if (userId || filter === "all") fetchPosts()
  }, [filter, userId])

  if (loading) return <p>Loading posts...</p>
  if (!posts.length) return <p>No posts found</p>

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostFeed
