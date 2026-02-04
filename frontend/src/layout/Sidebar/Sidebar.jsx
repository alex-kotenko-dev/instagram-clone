import { NavLink, Link } from "react-router-dom"
import styles from "./Sidebar.module.css"

import ICHGRA from "../../assets/icons/ICHGRA.svg"
import homeIcon from "../../assets/icons/home.svg"
import searchIcon from "../../assets/icons/search.svg"
import exploreIcon from "../../assets/icons/explore.svg"
import messagesIcon from "../../assets/icons/messenger.svg"
import notificationIcon from "../../assets/icons/notification.svg"
import createIcon from "../../assets/icons/create.svg"
import profileIcon from "../../assets/icons/profile.svg"

const Sidebar = ({ openPanel }) => {
  return (
    <aside className={styles.sidebar}>

      <Link to="/" className={styles.logo}>
        <img src={ICHGRA} alt="logo" className={styles.logo}/>
      </Link>

      <nav className={styles.nav}>

        <NavLink to="/" className={styles.link}>
          <img src={homeIcon} alt="home" className={styles.icon}/>
          <span className={styles.menu}>Home</span>
        </NavLink>

        <div
          className={styles.link}
          onClick={() => openPanel("search")}
        >
          <img src={searchIcon} alt="search" className={styles.icon}/>
          <span className={styles.menu}>Search</span>
        </div>

        <NavLink to="/explore" className={styles.link}>
          <img src={exploreIcon} alt="explore" className={styles.icon}/>
          <span className={styles.menu}>Explore</span>
        </NavLink>

        <div
          className={styles.link}
          onClick={() => openPanel("notifications")}
        >
          <img src={notificationIcon} alt="notifications" className={styles.icon}/>
          <span className={styles.menu}>Notifications</span>
        </div>

        <NavLink to="/messages" className={styles.link}>
          <img src={messagesIcon} alt="messages" className={styles.icon}/>
          <span className={styles.menu}>Messages</span>
        </NavLink>

        <NavLink to="/create" className={styles.link}>
          <img src={createIcon} alt="create" className={styles.icon}/>
          <span className={styles.menu}>Create</span>
        </NavLink>

        <div className={styles.profile}>
          <NavLink to="/profile" className={styles.link}>
            <img src={profileIcon} alt="profile" className={styles.icon}/>
            <span className={styles.menu}>Profile</span>
          </NavLink>
        </div>

      </nav>
    </aside>
  )
}

export default Sidebar
