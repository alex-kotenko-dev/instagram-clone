import API from './api'

export const getUserProfile = (id) => API.get(`/users/${id}`)
export const updateUserProfile = (id, data) => API.put(`/users/${id}`, data)