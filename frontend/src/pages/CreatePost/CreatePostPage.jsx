import CreatePost from "../../components/CreatePost/CreatePostComponents"
import { useEffect, useState } from "react"
import { getUserPosts } from "../../api/postsApi"
import { useSelector } from "react-redux"

const CreatePostPage = () => {
  const [posts, setPosts] = useState([])
  const profile = useSelector((state) => state.profile.profile)

  const loadPosts = async () => {
    if (!profile) return
    const res = await getUserPosts(profile._id)
    setPosts(res.data)
  }

  useEffect(() => {
    loadPosts()
  }, [profile])

  return (
    <div>
      <CreatePost onPostCreated={loadPosts} />
    </div>
  )
}

export default CreatePostPage