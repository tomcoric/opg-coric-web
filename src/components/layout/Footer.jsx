import Container from '../ui/Container'
import styles from './Footer.module.css'

const navLinks = [
  { href: '#hero',     label: 'Početna' },
  { href: '#about',    label: 'O nama' },
  { href: '#products', label: 'Proizvodi' },
  { href: '#contact',  label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src="/images/logo_veliki.png" alt="OPG Kulin Ćorić" className={styles.logo} />
            <p className={styles.tagline}>
              Svježi domaći proizvodi uzgojeni s ljubavlju, direktno s naše farme do vašeg stola.
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Brze veze</h4>
            <ul className={styles.links}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Kontakt</h4>
            <ul className={styles.links}>
              <li><a href="mailto:info@opg-coric.hr" className={styles.link}>info@opg-coric.hr</a></li>
              <li><a href="tel:+385XXXXXXXX" className={styles.link}>+385 XX XXX XXXX</a></li>
              <li className={styles.plain}>Vaša adresa, Hrvatska</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} OPG Kulin Ćorić. Sva prava pridržana.</p>
          <p className={styles.credit}>Napravljeno s ❤️ u Hrvatskoj</p>
        </div>
      </Container>
    </footer>
  )
}
