import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/slices/authSlice"
import { useNavigate, Link } from "react-router-dom"
import AuthForm from "../../components/AuthForm/AuthForm"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import style from "../../components/AuthForm/AuthForm.module.css"
import { clearError } from "../../redux/slices/authSlice"


const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [fullname, setFullname] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.auth.error)

  const [localError, setLocalError] = useState("")
  

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  if (!username || !email || !fullname || !password) {
    setLocalError("All fields are required")
    return
  }

  if (!validateEmail(email)) {
    setLocalError("Invalid email")
    return
  }

  setLocalError("")

    dispatch(register({ username, email, fullname, password }))
      .unwrap()
      .then((res) => {
        navigate('/profile')
      })
      .catch(() => {})
  }

  useEffect(() => {
      dispatch(clearError())
    }, [dispatch])

  const fields = [
    { name: "username", type: "text", value: username, placeholder: "Username", onChange: (e) => setUsername(e.target.value), autoComplete: "username" },
    { name: "email", type: "text", value: email, placeholder: "Email", onChange: (e) => setEmail(e.target.value), autoComplete: "email" },
    { name: "fullname", type: "text", value: fullname, placeholder: "Full Name", onChange: (e) => setFullname(e.target.value), autoComplete: "name" },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      value: password,
      placeholder: "Password",
      onChange: (e) => {
        setPassword(e.target.value)
        setLocalError("")
        dispatch(clearError())
      },
      autoComplete: "new-password",
      rightComponent: {
        label: showPassword ? <AiFillEyeInvisible /> : <AiFillEye />,
        onClick: () => setShowPassword(!showPassword),
      },
    },
  ]

  return (
    <AuthForm
      subtitle="Sign up to see photos and videos from your friends."
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Sign up"
      error={localError || error}
      footer={<>
       Have an account?{" "}
       <Link className={style.link_footer} to="/auth/login">
        Log in
       </Link>
      </>}
    >
      <div>
        <p className={style.register_rules}>
          People who use our service may have uploaded your contact information to Instagram.{" "}
          <Link className={style.extra} to="#">Learn more</Link>
        </p>
        <p className={style.register_rules}>
          By signing up, you agree to our{" "}
          <Link className={style.extra} to="#">Terms</Link>
          ,{" "}
          <Link className={style.extra} to="#">Privacy Policy</Link>
          ,{" "}and{" "}
          <Link className={style.extra} to="#">Cookie Policy</Link>
        </p>
      </div>
    </AuthForm>
  )
}

export default Register

