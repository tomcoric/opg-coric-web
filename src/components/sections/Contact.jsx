import Container from '../ui/Container'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="kontakt" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <img src="/images/katedrala.png" alt="" aria-hidden="true" className="cathedralHeader" />
            <span className={styles.label}>Kontakt</span>
            <h2>Kontaktirajte <em>nas</em></h2>
          </div>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <strong>Adresa</strong>
              <a href="https://www.google.com/maps?q=Miroslava+Krleže+2,+31400+Đakovo" target="_blank" rel="noopener noreferrer">
                Miroslava Krleže 2, 31400 Đakovo
              </a>
            </div>
            <div className={styles.infoItem}>
              <strong>E-mail</strong>
              <a href="mailto:opgcoricvladimir@gmail.com">opgcoricvladimir@gmail.com</a>
            </div>
            <div className={styles.infoItem}>
              <strong>Za sve informacije</strong>
              <span>Vladimir Ćorić</span>
              <a href="tel:+38598223844">+385 98 223 844</a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
