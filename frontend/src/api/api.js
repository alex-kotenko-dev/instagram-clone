import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const res = await axios.post('http://localhost:5000/api/auth/refresh', {token: refreshToken})
          const newAccessToken = res.data.token
          localStorage.setItem('token', newAccessToken)

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return API.request(originalRequest)
        } catch (err) {
          console.error('Refresh token failed', err)
        }
      }
    }   
    return Promise.reject(error)
  }
)

export default API