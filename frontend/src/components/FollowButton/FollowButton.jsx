import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { followUser, unfollowUser, getFollowers } from "../../api/followApi"

const FollowButton = ({ profile, setProfile }) => {
  const currentUserId = useSelector(state => state.auth.user?._id)
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!profile) return

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

  if (currentUserId === profile?._id) return null

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
    <button onClick={handleClick} disabled={loading}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  )
}

export default FollowButton
