import { useState } from "react"
import { useDispatch } from "react-redux"
import { register } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import AuthForm from "../../components/AuthForm/AuthForm"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [fullname, setFullname] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(register({ username, email, fullname, password }))
      .unwrap()
      .then((res) => {
        navigate(`/profile/${res.user._id}`)
      })
  }

  const fields = [
    { name: "username", type: "text", value: username, placeholder: "Username", onChange: (e) => setUsername(e.target.value), autoComplete: "username" },
    { name: "email", type: "text", value: email, placeholder: "Email", onChange: (e) => setEmail(e.target.value), autoComplete: "email" },
    { name: "fullname", type: "text", value: fullname, placeholder: "Full Name", onChange: (e) => setFullname(e.target.value), autoComplete: "name" },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      value: password,
      placeholder: "Password",
      onChange: (e) => setPassword(e.target.value),
      autoComplete: "new-password",
      rightComponent: {
        label: showPassword ? "hide" : "show",
        onClick: () => setShowPassword(!showPassword),
      },
    },
  ]

  return (
    <AuthForm
      title="Register"
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Register"
    />
  )
}

export default Register
