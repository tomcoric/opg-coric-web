import styles from './CathedralDivider.module.css'

export default function CathedralDivider() {
  return (
    <div className={styles.divider}>
      <img src="/images/katedrala.png" alt="Đakovačka katedrala" className={styles.img} />
      <div className={styles.overlay} />
    </div>
  )
}
