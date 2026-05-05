import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} style={{ backgroundImage: 'url(/images/Title slika.jpg)' }} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <img src="/images/logo_veliki.png" alt="OPG Kulin Ćorić" className={styles.logo} />
        <h1 className={styles.title}>
          DOBRODOŠLI NA STRANICE<br />OPG-A KULIN ĆORIĆ
        </h1>
        <p className={styles.subtitle}>
          Čuvamo tradiciju slavonskog kulina i promičemo kvalitetu domaćih proizvoda već više od petnaest godina.
        </p>
        <a href="#o-nama" className={styles.cta}>Saznaj više</a>
      </div>
    </section>
  )
}
