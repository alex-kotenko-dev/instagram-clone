import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import AuthForm from "../../components/AuthForm/AuthForm"
import style from "../../components/AuthForm/AuthForm.module.css"
import { Link } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { clearError } from "../../redux/slices/authSlice"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.auth.error)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        navigate('/profile')
      })
      .catch(() => {})
  }

  const fields = [
    {
      name: "email",
      type: "text",
      value: email,
      placeholder: "Username or Email",
      onChange: (e) => setEmail(e.target.value),
      autoComplete: "username",
    },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      value: password,
      placeholder: "Password",
      onChange: (e) => setPassword(e.target.value),
      autoComplete: "new-password",
      rightComponent: {
        label: showPassword ? <AiFillEyeInvisible /> : <AiFillEye />,
        onClick: () => setShowPassword(!showPassword),
      },
    }
  ]

  return (
    <AuthForm
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Log in"
      error={error}
      extraLink={{
        to: "/auth/forgotpassword",
        label: "Forgot password?",
      }}
      footer={<>
       Don't have an account?{" "}
       <Link className={style.link_footer} to="/auth/register">
        Sign up
       </Link>
      </>}
    >
      <div className={style.divider}>
       <span>OR</span>
      </div>
    </AuthForm>
  )
}

export default Login
