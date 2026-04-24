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
          Priroda na<br />vašem stolu
        </h1>
        <p className={styles.subtitle}>
          Svježi domaći proizvodi uzgojeni s ljubavlju — direktno s naše farme do vaše kuće.
        </p>
        <div className={styles.actions}>
          <Button href="#products" variant="accent">Pogledaj proizvode</Button>
          <Button href="#about" variant="outline-white">Saznaj više</Button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>10+</strong>
            <span>godina iskustva</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <strong>100%</strong>
            <span>prirodno</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <strong>lokalno</strong>
            <span>uzgojeno</span>
          </div>
        </div>
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll dolje">
        <span className={styles.scrollLine} />
      </a>
    </section>
  )
}
