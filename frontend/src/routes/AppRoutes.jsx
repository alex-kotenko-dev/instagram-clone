import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MainLayout } from "../layout/MainLayout/MainLayout";
import { PageTransitionWrapper } from "../components/PageTransitionWrapper/PageTransitionWrapper";

import HomePage from "../pages/Home/HomePage";
import ProfilePage from "../pages/Profile/ProfilePage";
import UserProfile from "../pages/Profile/UserProfile";
import EditProfilePage from "../pages/Profile/EditProfilePage"
import ExplorePage from "../pages/Explore/ExplorePage"
import MessagePage from "../pages/Message/MessagePage"
import LoginPage from "../pages/auth/Login"
import RegisterPage from "../pages/auth/Register"
import ForgotPassword from "../pages/auth/ForgotPassword"
import CheckEmail from "../pages/auth/CheckEmail"
import PostPage from "../pages/Post/PostPage"
import PostModal from "../pages/Post/PostModal"
import PageNotFound from "../pages/PageNotFound/PageNotFound"
import PrivateRoute from "../components/PrivateRoute/PrivateRoute"

export const AppRoutes = () => {
  const location = useLocation()
  const background = location.state?.background

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={background || location} key={location.pathname}>
        <Route path="/auth/login" element={<PageTransitionWrapper><LoginPage /></PageTransitionWrapper>} />
        <Route path="/auth/register" element={<PageTransitionWrapper><RegisterPage /></PageTransitionWrapper>} />
        <Route path="/auth/forgotpassword" element={<PageTransitionWrapper><ForgotPassword /></PageTransitionWrapper>} />
        <Route path="/auth/checkemail" element={<PageTransitionWrapper><CheckEmail /></PageTransitionWrapper>} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PageTransitionWrapper><HomePage /></PageTransitionWrapper>} />
            <Route path="/profile/:id" element={<PageTransitionWrapper><UserProfile /></PageTransitionWrapper>} />
            <Route path="/profile" element={<PageTransitionWrapper><ProfilePage /></PageTransitionWrapper>} />
            <Route path="/profile/edit" element={<PageTransitionWrapper><EditProfilePage /></PageTransitionWrapper>} />
            <Route path="/explore" element={<PageTransitionWrapper><ExplorePage /></PageTransitionWrapper>} />
            <Route path="/messages" element={<PageTransitionWrapper><MessagePage /></PageTransitionWrapper>} />
            <Route path="/messages/:userId" element={<PageTransitionWrapper><MessagePage /></PageTransitionWrapper>} />
            <Route path="/posts/:id" element={<PageTransitionWrapper><PostPage /></PageTransitionWrapper>} />
            <Route path="*" element={<PageTransitionWrapper><PageNotFound /></PageTransitionWrapper>} />
          </Route>
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/posts/:id" element={
            <PageTransitionWrapper>
              <PostModal />
            </PageTransitionWrapper>
          } />
        </Routes>
      )}
    </AnimatePresence>
  )
}