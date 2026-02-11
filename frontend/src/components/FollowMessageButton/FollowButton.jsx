import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { followUser, unfollowUser, getFollowers } from "../../api/followApi"
import styles from "./FollowMessageButton.module.css"
import MessageButton from "./MessageButton"

const FollowButton = ({ profile, setProfile }) => {
  const currentUserId = useSelector(state => state.auth.user?._id)
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!profile || !currentUserId) return

    const checkFollowing = async () => {
      try {
        const res = await getFollowers(profile._id)
        const followers = res.data
        setIsFollowing(followers.some(f => f.follower._id === currentUserId))
      } catch (err) {
        console.error(err)
      }
    }

    checkFollowing()
  }, [profile, currentUserId])

  if (!profile || currentUserId === profile?._id) return null

  const handleClick = async () => {
    setLoading(true)
    try {
      if (isFollowing) {
        await unfollowUser(profile._id)
        setIsFollowing(false)
        setProfile(prev => ({
          ...prev,
          followersCount: (prev.followersCount || 1) - 1
        }))
      } else {
        await followUser(profile._id)
        setIsFollowing(true)
        setProfile(prev => ({
          ...prev,
          followersCount: (prev.followersCount || 0) + 1
        }))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.buttons}>
      <button
        onClick={handleClick}
        disabled={loading}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={isFollowing ? styles.followingBtn : styles.followBtn}
      >
        {isFollowing ? (hovering ? "Unfollow" : "Following") : "Follow"}
      </button>
      
      <MessageButton recipientId={profile._id} />
    </div>
  )
}

export default FollowButton