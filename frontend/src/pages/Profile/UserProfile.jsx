import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import FollowButton from "../../components/FollowMessageButton/FollowButton"
import PostsGrid from "../../components/PostsGrid/PostsGridComponents"
import { getUserProfile } from "../../api/usersApi"
import { getUserPosts } from "../../api/postsApi"

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getUserProfile(id).then(res => setUser(res.data))
    getUserPosts(id).then(res => setPosts(res.data))
  }, [id])

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <ProfileCard profile={user}>
        <FollowButton profile={user} setProfile={setUser} />
      </ProfileCard>

      <PostsGrid posts={posts} />
    </div>
  )
}

export default UserProfile
