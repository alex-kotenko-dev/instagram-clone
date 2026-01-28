import API from './api'

export const likePost = (id) => API.post(`/likes/${id}/like`)
export const unlikePost = (id) => API.post(`/likes/${id}/unlike`)
export const getLikes = (id) => API.get(`/likes/${id}`)
