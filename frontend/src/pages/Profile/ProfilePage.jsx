import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile } from "../../redux/slices/profileSlice"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {profile, loading} = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(fetchMyProfile())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  if (!profile) return <p>No profile</p>

  return (
    <div>
      <ProfileCard profile={profile}/>

      <button onClick={() => navigate('/profile/edit')}>
        Edit profile
      </button>
    </div>
  )
}

export default Profile