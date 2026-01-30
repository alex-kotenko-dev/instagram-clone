import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import { getUserProfile } from "../../api/usersApi"

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserProfile(id).then(res => setUser(res.data))
  }, [id])

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <ProfileCard profile={user} />
      <button>Follow / Unfollow</button>
    </div>
  )
}

export default UserProfile
