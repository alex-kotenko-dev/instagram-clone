import API from './api'

export const searchUsers = (query) => API.get(`/search/user?q=${query}`)
export const explorePosts = () => API.get('/search/explore')