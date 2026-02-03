import { Link } from "react-router-dom"
import style from "../../components/AuthForm/AuthForm.module.css"

const CheckEmail = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <h2>Check your email</h2>
        <p className={style.subtitle}>
          We sent a password reset link to your email.
        </p>

        <Link className={style.link_footer} to="/auth/login">
          Back to login
        </Link>
      </div>
    </div>
  )
}

export default CheckEmail
