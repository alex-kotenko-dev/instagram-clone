import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = () => {
  const {isAuth, authChecked} = useSelector ((state) => state.auth)

  if (!authChecked) {
    return <div>Loading...</div>
  }

  if (!isAuth) {
    return <Navigate to="auth/login"/>
  }

  return <Outlet/>
}

export default PrivateRoute