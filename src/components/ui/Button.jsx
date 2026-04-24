import styles from './Button.module.css'

export default function Button({ children, variant = 'primary', href, onClick, type = 'button', ...props }) {
  const className = `${styles.btn} ${styles[variant]}`

  if (href) {
    return <a href={href} className={className} {...props}>{children}</a>
  }

  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
