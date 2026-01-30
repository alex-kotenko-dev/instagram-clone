import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../../components/AuthForm/AuthForm"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/auth/check-email")
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
      title="Forgot password?"
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Send reset link"
    />
  )
}

export default ForgotPassword
