import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

import SearchPage from '../../pages/Search/SearchPage'
import NotificationsPage from '../../pages/Notifications/NotificationsPage'

import styles from './MainLayout.module.css'

export const MainLayout = () => {
  const [panel, setPanel] = useState(null)

  const closePanel = () => setPanel(null)

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <Sidebar openPanel={setPanel} />

        <main className={styles.main}>
          <Outlet />
        </main>

        {panel && (
          <>
            <div
              className={styles.overlay}
              onClick={closePanel}
            />

            {panel === "search" && (
              <div className={styles.panel}>
                <SearchPage closePanel={closePanel} />
              </div>
            )}

            {panel === "notifications" && (
              <div className={styles.panel}>
                <NotificationsPage closePanel={closePanel}/>
              </div>
            )}
          </>
        )}

      </div>

      <Footer />
    </div>
  )
}
