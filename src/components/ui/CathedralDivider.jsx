import styles from './CathedralDivider.module.css'

export default function CathedralDivider() {
  return (
    <div className={styles.divider}>
      <img src="/images/katedrala.png" alt="" aria-hidden="true" className={styles.img} />
      <div className={styles.overlay} />
      <div className={styles.caption}>
        <span className={styles.line} />
        <p className={styles.text}>Đakovo · srce Slavonije</p>
        <span className={styles.line} />
      </div>
    </div>
  )
}
