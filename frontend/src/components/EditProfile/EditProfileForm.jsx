import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile, updateProfile } from "../../redux/slices/profileSlice"
import { logout } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"

const EditProfileForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { profile, loading, error } = useSelector((state) => state.profile)

  const [fullname, setFullname] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    if (!profile) {
      dispatch(fetchMyProfile())
    } else {
      setFullname(profile.fullname)
      setBio(profile.bio)
    }
  }, [dispatch, profile])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('fullname', fullname)
    formData.append('bio', bio)

    if (avatar) {
      formData.append('avatar', avatar)
    }

    const res = await dispatch(updateProfile(formData))

    if (res.type === "profile/update/fulfilled") {
      navigate('/profile')
    }
  }

  if (loading) return <p>Loading...</p>

  const handleLogout = () => {
   dispatch(logout())
   navigate("/auth/login")
 }

  return (
    <div>
      <h2>Edit Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Fullname"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />

        <button type="submit">Save</button>

        <button type="button" onClick={handleLogout}>
         Logout
        </button>

      </form>
    </div>
  )
}

export default EditProfileForm
