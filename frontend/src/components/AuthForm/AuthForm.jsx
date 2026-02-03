import style from './AuthForm.module.css'
import ICHGRA from "../../assets/icons/ICHGRA.svg"

const AuthForm = ({ title, subtitle, fields, onSubmit, buttonText, topContent, children, extraLink, footer, showLogo = true, error }) => {
  return (
    <div className={style.wrapper}>
    <form className={style.form} onSubmit={onSubmit} autoComplete="off">
      {error && <p className={style.error}>{error}</p>}

      {topContent}
      
      {showLogo && (
        <img src={ICHGRA} alt="search" className={style.title}/>
      )}

      {title && <h2 className={style.title_forgot}>{title}</h2>}
      <p className={style.subtitle}>{subtitle}</p>

      {Array.isArray(fields) && fields.map((field) => (
        <div className={style.container} key={field.name}>
          <input
            className={style.input}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete || "off"}
          />

          {field.rightComponent && (
            <span className={style.eye} onClick={field.rightComponent.onClick}>
              {field.rightComponent.label}
            </span>
          )}
        </div>
      ))}

      <button className={style.btn} type="submit">{buttonText}</button>

      {children}

      {extraLink && (
        <p>
          {extraLink.text}{" "}
          <a href={extraLink.to} className={style.extra}>{extraLink.label}</a>
        </p>
      )}
      
    </form>
    {footer && <div className={style.footer}>{footer}</div>}
    </div>
  )
}

export default AuthForm

