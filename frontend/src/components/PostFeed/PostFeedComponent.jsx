import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PostsGrid from "../PostsGrid/PostsGridComponents"
import { getPosts } from "../../api/postsApi"
import { getFollowing } from "../../api/followApi"

const PostFeed = ({ filter }) => {
  const userId = useSelector(state => state.auth.user?._id)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)

  const randomArray = (array) => {
    return array
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)
  }

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

      allPosts = randomArray(allPosts)

      setPosts(allPosts)
    } catch (err) {
      console.error("Error fetching posts:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId || filter === "all") fetchPosts()
  }, [filter, userId])

  if (loading) return <p>Loading posts...</p>
  if (!posts.length) return <p>No posts found</p>

  return (
    <PostsGrid
      posts={posts}
      onPostClick={(post) => setSelectedPost(post)}
    />
  )
}

export default PostFeed
