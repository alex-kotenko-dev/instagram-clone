import AuthForm from "../../components/AuthForm/AuthForm"

const CheckEmail = () => {
  return (
    <AuthForm
      title="Check your email"
      fields={[]}
      onSubmit={() => {}}
      buttonText="Back to login"
      extraLink={{
        text: "",
        to: "/auth/login",
        label: "Go to login",
      }}
    />
  )
}

export default CheckEmail
