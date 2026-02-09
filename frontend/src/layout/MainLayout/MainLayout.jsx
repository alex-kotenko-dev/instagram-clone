import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

import SearchPage from '../../pages/Search/SearchPage'
import NotificationsPage from '../../pages/Notifications/NotificationsPage'
import CreatePost from '../../components/CreatePost/CreatePostComponents'

import styles from './MainLayout.module.css'

export const MainLayout = () => {
  const [panel, setPanel] = useState(null)
  const location = useLocation()

  const closePanel = () => setPanel(null)

  useEffect(() => {
    closePanel()
  }, [location.pathname])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Sidebar openPanel={setPanel} />

        <main className={styles.main}>
          <Outlet />
        </main>

        {panel && (
          <div
            className={styles.overlay}
            onClick={closePanel}
          />
        )}

        {panel === "search" && (
          <div className={styles.panel}>
            <SearchPage closePanel={closePanel} />
          </div>
        )}

        {panel === "notifications" && (
          <div className={styles.panel}>
            <NotificationsPage closePanel={closePanel} />
          </div>
        )}

        {panel === "create" && (
          <div className={styles.createModal}>
            <CreatePost closePanel={closePanel} />
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}