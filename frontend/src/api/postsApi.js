import API from './api'

export const getPosts = () => API.get('/posts')

export const createPost = (data) => 
  API.post('/posts', data, {
    headers: { "Content-Type": "multipart/form-data" }
})

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const editPost = (id, data) => 
  API.patch(`/posts/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" }
})

export const getUserPosts = (id) => API.get(`/posts/user/${id}`)

export const getPostById = (id) => API.get(`/posts/${id}`)
