import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

export const MainLayout = () => {
  console.log('MainLayout')
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
