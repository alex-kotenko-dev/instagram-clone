import styles from './NotFoundPage.module.css'
import { useNavigate } from 'react-router-dom'
import img404 from '../../assets/images/Background.svg'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSide}>
        <img src={img404} alt="404" />
      </div>
      <div className={styles.textSide}>
        <h1>Oops! Page Not Found (404 Error)</h1>
        <p>We're sorry, but the page you're looking for doesn't seem to exist.
           If you typed the URL manually, please double-check the spelling.
           If you clicked on a link, it may be outdated or broken.
       </p>
      </div>
    </div>
  )
}

export default NotFoundPage