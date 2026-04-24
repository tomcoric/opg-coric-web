import Button from '../ui/Button'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} style={{ backgroundImage: 'url(/images/Title slika.jpg)' }} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.eyebrow}>OPG Kulin Ćorić · Slavonija</p>
        <h1 className={styles.title}>
          Domaće.<br />Prirodno.<br />
          <em>S dušom.</em>
        </h1>
        <p className={styles.subtitle}>
          Generacijama uzgajamo, prerađujemo i čuvamo<br />
          tradiciju slavonskog stola.
        </p>
        <div className={styles.actions}>
          <Button href="#products" variant="accent">Naši proizvodi</Button>
          <Button href="#about" variant="outline-white">Naša priča</Button>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}
