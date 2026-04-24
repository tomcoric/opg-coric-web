import styles from './SectionTitle.module.css'

export default function SectionTitle({ label, title, subtitle, align = 'center' }) {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
