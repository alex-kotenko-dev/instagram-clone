import { Routes, Route, useLocation } from "react-router-dom"
import { MainLayout } from "../layout/MainLayout/MainLayout"

import HomePage from "../pages/Home/HomePage"
import ProfilePage from "../pages/Profile/ProfilePage"
import SearchPage from "../pages/Search/SearchPage"
import ExplorePage from "../pages/Explore/ExplorePage"
import NotificationsPage from "../pages/Notifications/NotificationsPage"
import MessagePage from "../pages/Message/MessagePage"
import LoginPage from "../pages/auth/Login"
import RegisterPage from "../pages/auth/Register"
import PageNotFound from "../pages/PageNotFound/PageNotFound"
import CreatePostPage from "../pages/CreatePost/CreatePostPage"
import PrivateRoute from "../components/PrivateRoute/PrivateRoute"
import ForgotPassword from "../pages/auth/ForgotPassword"
import CheckEmail from "../pages/auth/CheckEmail"
import PostPage from "../pages/Post/PostPage"
import PostModal from "../pages/Post/PostModal"

import EditProfilePage from "../pages/Profile/EditProfilePage"
import UserProfile from "../pages/Profile/UserProfile"

export const AppRoutes = () => {
  const location = useLocation()
  const background = location.state?.background

  return (
    <>
      <Routes location={background || location}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="/auth/checkemail" element={<CheckEmail />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/posts/:id" element={<PostModal />} />
        </Routes>
      )}
    </>
  )
}
