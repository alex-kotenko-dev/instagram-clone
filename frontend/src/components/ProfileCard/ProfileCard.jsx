const ProfileCard = ({ profile }) => {
  return (
    <div>
      <img src={profile.avatar || "/avatar.png"} alt="avatar" width={120} />
      <h2>{profile.fullname}</h2>
      <p>{profile.bio}</p>
    </div>
  )
}

export default ProfileCard