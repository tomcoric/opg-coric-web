import styles from './Hero.module.css'

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1L2 3.5v3.5c0 2.8 2.2 4.8 5 5.5 2.8-.7 5-2.7 5-5.5V3.5L7 1z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 13S2 8.8 2 5.5a5 5 0 0 1 10 0C12 8.8 7 13 7 13z" />
      <circle cx="7" cy="5.5" r="1.8" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} style={{ backgroundImage: 'url(/images/title-slika.jpg)' }} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <img src="/images/Kulin_Coric_Logo_Web.png" alt="Kulin Ćorić" className={styles.logo} />

        <h1 className={styles.title}>
          Dobro došli u srce <em>slavonske</em> tradicije
        </h1>

        <p className={styles.subtitle}>
          Čuvamo tradiciju slavonskog kulina i promičemo kvalitetu domaćih
          proizvoda već više od petnaest godina.
        </p>

        <div className={styles.rule} />

        <div className={styles.actions}>
          <a href="#kontakt"  className={styles.ctaPrimary}>Naruči kulin</a>
          <a href="#o-nama"   className={styles.ctaSecondary}>Naša priča</a>
        </div>

        <div className={styles.trust}>
          <span className={styles.trustItem}><ShieldIcon />EU IGP zaštita</span>
          <span className={styles.trustDivider} />
          <span className={styles.trustItem}><PinIcon />Đakovački kulin</span>
        </div>
      </div>
    </section>
  )
}
