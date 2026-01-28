import API from './api'

export const followUser = (id) => API.post(`/follow/follow/${id}`)
export const unfollowUser = (id) => API.delete(`/follow/unfollow/${id}`)
export const getFollowers = (id) => API.get(`/follow/followers/${id}`)
export const getFollowing = (id) => API.get(`/follow/following/${id}`)
