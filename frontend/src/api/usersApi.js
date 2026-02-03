import API from './api'

export const getUserProfile = (id) => API.get(`/users/${id}`)
export const updateUserProfile = (data) => API.patch(`/users/me`, data)
export const getUserPosts = (userId) => API.get(`/posts/user/${userId}`)