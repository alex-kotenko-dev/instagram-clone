import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import AuthForm from "../../components/AuthForm/AuthForm"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        navigate(`/profile/${res.user._id}`);
      });
  };

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
      autoComplete: "current-password",
      rightComponent: {
        label: showPassword ? "hide" : "show",
        onClick: () => setShowPassword(!showPassword),
      },
    }
  ]

  return (
    <AuthForm
      title="Login"
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Log in"
      extraLink={{
        text: "Forgot password?",
        to: "/auth/forgotpassword",
        label: "Reset",
      }}
    />
  )
}

export default Login
