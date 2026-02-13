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




// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppRoutes } from './routes/AppRoutes'
// import { logout, setCredentials } from './redux/slices/authSlice'
// import { connectSocket } from './socket'
// import API from './api/api'

// function App() {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const checkAuthAndConnect = async () => {
//       const token = localStorage.getItem('token')

//       if (!token) {
//         dispatch(logout())
//         return
//       }

//       try {
//         const res = await API.get('/users/me')

//         dispatch(setCredentials({
//           user: res.data,
//           token
//         }))

//         connectSocket(token)

//       } catch (error) {
//         dispatch(logout())
//       }
//     }

//     checkAuthAndConnect()
//   }, [dispatch])

//   return <AppRoutes />
// }

// export default App




import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppRoutes } from "./routes/AppRoutes";
import { logout, setCredentials } from "./redux/slices/authSlice";
import { connectSocket } from "./socket";
import API from "./api/api";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);  // состояние загрузки
  const [error, setError] = useState(null);      // состояние ошибки

  useEffect(() => {
    const checkAuthAndConnect = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(logout());
        setLoading(false);
        return;
      }

      try {
        // Проверяем токен на сервере
        const res = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Сохраняем пользователя в Redux
        dispatch(
          setCredentials({
            user: res.data,
            token,
          })
        );

        // Подключаем сокет
        connectSocket(token);

      } catch (err) {
        console.error("Auth check failed:", err.response?.data || err.message);
        setError(err.response?.data?.message || err.message);
        dispatch(logout());
      } finally {
        setLoading(false); // снимаем состояние загрузки
      }
    };

    checkAuthAndConnect();
  }, [dispatch]);

  if (loading) return <div>Loading app...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return <AppRoutes />;
}

export default App;