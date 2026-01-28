import { Routes, Route } from "react-router-dom"
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


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/create" element={<CreatePostPage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
