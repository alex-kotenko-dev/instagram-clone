import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import React, { useState } from "react"
import styles from "./Sidebar.module.css"

import ICHGRA from "../../assets/icons/ICHGRA.svg"
import homeIcon from "../../assets/icons/home.svg"
import searchIcon from "../../assets/icons/search.svg"
import exploreIcon from "../../assets/icons/explore.svg"
import messagesIcon from "../../assets/icons/messenger.svg"
import notificationIcon from "../../assets/icons/notification.svg"
import createIcon from "../../assets/icons/create.svg"

const Sidebar = ({ openPanel }) => {
  const { profile } = useSelector((state) => state.profile)
  const [activePanel, setActivePanel] = useState(null)

  const handleOpenPanel = (panelName) => {
    openPanel(panelName)
    setActivePanel(panelName)
  }

  const navClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.navlinkActive}` : styles.link

  return (
    <aside className={styles.sidebar}>

      <img src={ICHGRA} alt="logo" className={styles.logo}/>

      <nav className={styles.nav}>

        <NavLink to="/" className={navClass}>
          <img src={homeIcon} className={styles.icon}/>
          <span className={styles.menu}>Home</span>
        </NavLink>

        <div 
          className={`${styles.link} ${activePanel === "search" ? styles.panelActive : ""}`}
          onClick={() => handleOpenPanel("search")}>
          <img src={searchIcon} className={styles.icon}/>
          <span className={styles.menu}>Search</span>
        </div>

        <NavLink to="/explore" className={navClass}>
          <img src={exploreIcon} className={styles.icon}/>
          <span className={styles.menu}>Explore</span>
        </NavLink>

        <div 
          className={`${styles.link} ${activePanel === "notifications" ? styles.panelActive : ""}`}
          onClick={() => handleOpenPanel("notifications")}>
          <img src={notificationIcon} className={styles.icon}/>
          <span className={styles.menu}>Notifications</span>
        </div>

        <NavLink to="/messages" className={navClass}>
          <img src={messagesIcon} className={styles.icon}/>
          <span className={styles.menu}>Messages</span>
        </NavLink>

        <div 
          className={`${styles.link} ${activePanel === "create" ? styles.panelActive : ""}`} 
          onClick={() => handleOpenPanel("create")}>
          <img src={createIcon} className={styles.icon}/>
          <span className={styles.menu}>Create</span>
        </div>

        <div className={styles.profile}>
          <NavLink to="/profile" className={navClass}>
            <img
                src={profile?.avatar || "/default-avatar.png"}
                alt="profile"
                className={styles.avatar}
                onError={(e) => {
                e.target.onerror = null
                e.target.src = "/default-avatar.png"
              }}
            />
            <span className={styles.menu}>Profile</span>
          </NavLink>
        </div>

      </nav>
    </aside>
  )
}

export default Sidebar