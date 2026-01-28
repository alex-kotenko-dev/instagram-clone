import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href='#'>About</a>
        <a href='#'>Terms</a>
        <a href='#'>Privacy</a>
        <a href='#'>Support</a>
        <a href='#'>Contacts</a>
        <a href='#'>Careers</a>
      </div>

      <div className={styles.date}>© 2026 Social Media App</div>
    </footer>
  )
}

export default Footer