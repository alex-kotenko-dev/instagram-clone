import API from './api'

export const addComment = (postId, text) => API.post(`/comments/${postId}/comment`, { text })
export const getComments = (postId) => API.get(`/comments/${postId}`)
export const deleteComment = (commentId) => API.delete(`/comments/${commentId}`)
