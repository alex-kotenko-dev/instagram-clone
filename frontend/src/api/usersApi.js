import API from './api'

export const getUserProfile = (id) => API.get(`/users/${id}`)
export const updateUserProfile = (data) => API.patch(`/users/me`, data)