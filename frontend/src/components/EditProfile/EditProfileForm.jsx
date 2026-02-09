import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile, updateProfile } from "../../redux/slices/profileSlice"
import { logout } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import styles from "./EditProfile.module.css"

const BIO_LIMIT = 150

const EditProfileForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { profile, loading, error } = useSelector((state) => state.profile)

  const [fullname, setFullname] = useState("")
  const [bio, setBio] = useState("")
  const [link, setLink] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!profile) {
      dispatch(fetchMyProfile())
    } else {
      setFullname(profile.fullname || "")
      setBio(profile.bio || "")
      setLink(profile.link || "")
    }
  }, [dispatch, profile])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("fullname", fullname)
    formData.append("bio", bio)

    if (link.trim()) {
      formData.append("link", link.trim())
    }

    if (avatar) {
      formData.append("avatar", avatar)
    }

    const res = await dispatch(updateProfile(formData))

    if (res.type === "profile/update/fulfilled") {
      navigate("/profile")
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/auth/login")
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setAvatar(file)
    setPreview(URL.createObjectURL(file))
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className={styles.wrapperEdit}>
      <h2>Edit Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.formContainer}>

        <div className={styles.avatarRow}>
          {(preview || avatar || profile?.avatar) && (
            <img
              src={preview || avatar || profile.avatar}
              alt="avatar"
              className={styles.avatarCircle}
            />
          )}

          <div className={styles.avatarButtons}>
            <label className={styles.newPhotoButton}>
              New photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>

        <h3 className={styles.titles}>Username</h3>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Fullname"
          className={styles.inputEdit}
        />

        <h3 className={styles.titles}>Website</h3>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Website (optional)"
          className={styles.inputEdit}
        />

        <h3 className={styles.titles}>About</h3>
        <div className={styles.textareaWrap}>
          <textarea
            value={bio}
            maxLength={BIO_LIMIT}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            className={styles.textareaEdit}
          />
          <div
            className={`${styles.counter} ${bio.length > 130 ? styles.warn : ""}`}
          >
            {bio.length}/{BIO_LIMIT}
          </div>
        </div>

        <div className={styles.buttonsEdit}>
          <button type="submit" className={styles.btnSave}>
            Save
          </button>

          <button type="button" onClick={handleLogout} className={styles.editButton}>
            Logout
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm