import style from './AuthForm.module.css'

const AuthForm = ({ title, fields, onSubmit, buttonText, extraLink }) => {
  return (
    <form className={style.form} onSubmit={onSubmit} autoComplete="off">
      <h2 className={style.title}>{title}</h2>

      {Array.isArray(fields) && fields.map((field) => (
        <div className={style.container} key={field.name} style={{ marginBottom: 10 }}>
          <input
            className={style.input}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
          />

          {field.rightComponent && (
            <span onClick={field.rightComponent.onClick}>
              {field.rightComponent.label}
            </span>
          )}
        </div>
      ))}

      <button className={style.btn} type="submit">{buttonText}</button>

      {extraLink && (
        <p>
          {extraLink.text}{" "}
          <a href={extraLink.to}>{extraLink.label}</a>
        </p>
      )}
    </form>
  )
}

export default AuthForm
