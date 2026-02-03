import style from './ProfileCard.module.css'

const ProfileCard = ({ profile }) => {
  return (
    <div className={style.wrapper}>
      <div> 
        <img className={style.avatar} src={profile.avatar || "/avatar.png"} alt="avatar" width={120} />
      </div>

      <div className={style.contentWrapper}>
      <h2 className={style.title}>{profile.fullname}</h2>

      <div className={style.container}>
      <div>
        <b>{profile.postsCount || 0}</b>
        <p>Posts</p>
      </div>

      <div>
        <b>{profile.followersCount || 0}</b>
        <p>Followers</p>
      </div>

      <div>
        <b>{profile.followingCount || 0}</b>
        <p>Following</p>
      </div>
      </div>

      <p>{profile.bio}</p>
      </div>
    </div>
  )
}

export default ProfileCard