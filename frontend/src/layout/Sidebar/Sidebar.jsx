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

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.logo}>
        <img src={ICHGRA} alt="search" className={styles.logo}/>
      </Link>

      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link}>
          <img src={homeIcon} alt="home" className={styles.icon}/>
          <span className={styles.menu}>Home</span>
        </NavLink>

        <NavLink to="/search" className={styles.link}>
          <img src={searchIcon} alt="search" className={styles.icon}/>
          <span className={styles.menu}>Search</span>
        </NavLink>

        <NavLink to="/explore" className={styles.link}>
          <img src={exploreIcon} alt="explore" className={styles.icon}/>
          <span className={styles.menu}>Explore</span>
        </NavLink>

        <NavLink to="/notifications" className={styles.link}>
          <img src={notificationIcon} alt="notifications" className={styles.icon}/>
          <span className={styles.menu}>Notifications</span>
        </NavLink>

        <NavLink to="/messages" className={styles.link}>
          <img src={messagesIcon} alt="messages" className={styles.icon}/>
          <span className={styles.menu}>Messages</span>
        </NavLink>

        <NavLink to="/create" className={styles.link}>
          <img src={createIcon} alt="create" className={styles.icon}/>
          <span className={styles.menu}>Create</span>
        </NavLink>

        <div className={styles.profile}>
          <NavLink to="/profile/1" className={styles.link}>
           <img src={profileIcon} alt="profile" className={styles.icon}/>
          <span className={styles.menu}>Profile</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
