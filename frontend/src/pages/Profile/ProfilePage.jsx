import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile } from "../../redux/slices/profileSlice"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import PostsGrid from "../../components/PostsGrid/PostsGridComponents"
import { useNavigate, useOutletContext } from "react-router-dom"
import { getUserPosts } from "../../api/postsApi"
import styles from "../../components/EditProfile/EditProfile.module.css"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { profile, loading } = useSelector((state) => state.profile)
  const [posts, setPosts] = useState([])

  const { newPost, setNewPost } = useOutletContext() || {}

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

  useEffect(() => {
    if (newPost) {
      setPosts(prev => [newPost, ...prev])
      setNewPost(null)
    }
  }, [newPost, setNewPost])

  if (loading) return <p>Loading...</p>
  if (!profile) return <p>No profile</p>

  return (
    <div>
      <ProfileCard profile={profile}>
        <button
          onClick={() => navigate('/profile/edit')}
          className={styles.editButton}
        >
          Edit profile
        </button>
      </ProfileCard>

      <PostsGrid posts={posts} />
    </div>
  )
}

export default Profile