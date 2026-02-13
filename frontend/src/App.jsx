// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { AppRoutes } from './routes/AppRoutes'
// import { logout, setCredentials } from './redux/slices/authSlice'
// import { connectSocket } from './socket'
// import API from './api/api'
// import './styles/App.css'

// function App() {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const token = localStorage.getItem('token')

//     if (token) {
//       API.get('/users/me')
//         .then(res => {
//           dispatch(setCredentials({
//             user: res.data,
//             token
//           }))

//           connectSocket(token)
//         })
//         .catch(() => {
//           dispatch(logout())
//         })
//     } else {
//       dispatch(logout())
//     }
//   }, [dispatch])

//   return <AppRoutes />
// }

// export default App




import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppRoutes } from './routes/AppRoutes'
import { logout, setCredentials } from './redux/slices/authSlice'
import { connectSocket } from './socket'
import API from './api/api'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuthAndConnect = async () => {
      const token = localStorage.getItem('token')

      if (token) {
        try {

          const res = await API.get('/users/me')
          dispatch(setCredentials({ user: res.data, token }))


          const socket = connectSocket(token)

          socket.on("connect", () => console.log("Socket connected", socket.id))
          socket.on("disconnect", (reason) => console.log("Socket disconnected", reason))
          socket.onAny((event, data) => console.log("Socket event:", event, data))

        } catch (err) {
          dispatch(logout()) 
        }
      } else {
        dispatch(logout())
      }
    }

    checkAuthAndConnect()
  }, [dispatch])

  return <AppRoutes />
}

export default App