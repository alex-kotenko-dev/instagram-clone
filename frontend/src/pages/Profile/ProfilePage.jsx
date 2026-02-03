import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile } from "../../redux/slices/profileSlice"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import PostsGrid from "../../components/PostsGrid/PostsGridComponents"
import { useNavigate } from "react-router-dom"
import { getUserPosts } from "../../api/postsApi"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {profile, loading} = useSelector((state) => state.profile)

  const [posts, setPosts] = useState([])

const loadPosts = async () => {
  if (!profile) return
  const res = await getUserPosts(profile._id)
  setPosts(res.data)
}

  useEffect(() => {
    dispatch(fetchMyProfile())
  }, [dispatch])

  useEffect(() => {
    loadPosts()
  }, [profile])

  if (loading) return <p>Loading...</p>
  if (!profile) return <p>No profile</p>

  return (
    <div>
      <ProfileCard profile={profile}/>

      <button onClick={() => navigate('/profile/edit')}>
        Edit profile
      </button>

      <PostsGrid posts={posts} />
    </div>
  )
}

export default Profile