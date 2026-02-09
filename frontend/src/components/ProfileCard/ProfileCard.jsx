import style from './ProfileCard.module.css'

const ProfileCard = ({ profile, children }) => {
  return (
    <div className={style.wrapper}>
      <div> 
        <img className={style.avatar} src={profile.avatar || "/avatar.png"} alt="avatar" width={120} />
      </div>

      <div className={style.contentWrapper}>
      <h2 className={style.title}>{profile.fullname}</h2>

      <div className={style.container}>
      <div className={style.stat}>
        <b>{profile.postsCount || 0}</b>
        <span>posts</span>
      </div>

      <div className={style.stat}>
        <b>{profile.followersCount || 0}</b>
        <span>followers</span>
      </div>

      <div className={style.stat}>
        <b>{profile.followingCount || 0}</b>
        <span>following</span>
      </div>
      </div>

      <p>{profile.bio}</p>

      {children}
      </div>
    </div>
  )
}

export default ProfileCard