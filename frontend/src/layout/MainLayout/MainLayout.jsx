import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import styles from './MainLayout.module.css'

export const MainLayout = () => {
  console.log('MainLayout')
  return (
    <div className={styles.page}>
      <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
      </div>
      
      <Footer />
    </div>
  )
}
