import Button from '../ui/Button'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} style={{ backgroundImage: 'url(/images/Title slika.jpg)' }} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.badge}>OPG Kulin Ćorić</span>

        <h1 className={styles.title}>
          Domaće s dušom,<br />
          <span className={styles.titleAccent}>prirodno i svježe</span>
        </h1>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerIcon}>🌾</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.subtitle}>
          Generacijama njegujemo tradiciju uzgoja kvalitetnih domaćih proizvoda —
          direktno s naše slavonske farme do vašeg stola.
        </p>

        <div className={styles.actions}>
          <Button href="#products" variant="accent">Naši proizvodi</Button>
          <Button href="#about" variant="outline-white">Naša priča</Button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>15+</strong>
            <span>godina tradicije</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <strong>100%</strong>
            <span>domaće</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <strong>Slavonija</strong>
            <span>porijeklo</span>
          </div>
        </div>
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll dolje">
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollLine} />
      </a>
    </section>
  )
}
