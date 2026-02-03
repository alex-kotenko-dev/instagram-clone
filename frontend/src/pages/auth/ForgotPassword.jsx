import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthForm from "../../components/AuthForm/AuthForm"
import style from "../../components/AuthForm/AuthForm.module.css"
import forgetpass from "../../assets/images/forgetpass.svg"


const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/auth/checkemail")
  }

  const fields = [
    {
      name: "email",
      type: "email",
      value: email,
      placeholder: "Email",
      onChange: (e) => setEmail(e.target.value),
      autoComplete: "email",
    }
  ]

  return (
    <AuthForm
      showLogo={false}
      topContent={
        <img src={forgetpass}/>
      }
      title="Trouble logging in?"
      subtitle="Enter your email, phone, or username and we'll send you a link to get back into your account."
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Reset your password"
      extraLink={{
        to: "/auth/register",
        label: "Create new account",
      }}
      footer={<>
       <Link className={style.link_footer} to="/auth/login">
        Back to login
       </Link>
      </>}
    >
      <div className={style.divider}>
       <span>OR</span>
      </div>

    </AuthForm>
  )
}

export default ForgotPassword
