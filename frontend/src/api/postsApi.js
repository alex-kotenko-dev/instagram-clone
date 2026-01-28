import API from './api'

export const getPosts = () => API.get('/posts')
export const createPost = (data) => API.post('/posts', data)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const editPost = (id, data) => API.put(`/posts/${id}`, data)
export const getUserPosts = (id) => API.get(`/posts/user/${id}`)
export const getPostById = (id) => API.get(`/posts/${id}`)
