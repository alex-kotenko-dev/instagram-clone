import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppRoutes } from './routes/AppRoutes'
import { logout, setCredentials } from './redux/slices/authSlice'
import { connectSocket } from './socket'
import API from './api/api'
import './styles/App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('Token sent:', token)

    if (token) {
      API.get('/users/me')
        .then(res => {
          dispatch(setCredentials({
            user: res.data,
            token
          }))

          connectSocket(token)
        })
        .catch(() => {
          dispatch(logout())
        })
    } else {
      dispatch(logout())
    }
  }, [dispatch])

  return <AppRoutes />
}

export default App
