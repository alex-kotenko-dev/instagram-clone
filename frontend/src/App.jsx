import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppRoutes } from "./routes/AppRoutes"
import { logout, setCredentials } from "./redux/slices/authSlice"
import { connectSocket } from "./socket"
import API from "./api/api"

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const checkAuthAndConnect = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        dispatch(logout())
        setLoading(false)
        return
      }

      try {
        const res = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(
          setCredentials({
            user: res.data,
            token,
          })
        )

        connectSocket(token)

      } catch (err) {
        console.error("Auth check failed:", err.response?.data || err.message)
        setError(err.response?.data?.message || err.message)
        dispatch(logout())
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndConnect()
  }, [dispatch])

  if (loading) return <div>Loading app...</div>
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>

  return <AppRoutes />
}

export default App