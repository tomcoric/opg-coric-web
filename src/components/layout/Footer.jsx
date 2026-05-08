import Container from '../ui/Container'
import styles from './Footer.module.css'

const navLinks = [
  { href: '#hero',         label: 'Naslovnica' },
  { href: '#o-nama',       label: 'O nama' },
  { href: '#sto-je-kulin', label: 'Što je kulin?' },
  { href: '#proizvodi',   label: 'Proizvodi' },
  { href: '#mediji',       label: 'Mediji' },
  { href: '#kontakt',      label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.col}>
            <div className={styles.brand}>
              <img src="/images/kulin_coric_varijanta_3_gold_transparent_web.png" alt="Kulin Ćorić" className={styles.brandLogo} />
              <span className={styles.brandName}>Kulin Ćorić</span>
            </div>
            <p className={styles.tagline}>
              Tradicija slavonskog stola od 2009.<br />
              Đakovo, Slavonija.
            </p>
          </div>

          {/* Navigacija */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Navigacija</h4>
            <nav className={styles.list}>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Kontakt */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Kontakt</h4>
            <div className={styles.list}>
              <a
                href="https://www.google.com/maps?q=Miroslava+Krleže+2,+31400+Đakovo"
                target="_blank" rel="noopener noreferrer"
                className={styles.link}
              >
                Miroslava Krleže 2<br />31400 Đakovo
              </a>
              <a href="mailto:opgcoricvladimir@gmail.com" className={styles.link}>
                opgcoricvladimir@gmail.com
              </a>
              <a href="tel:+38598223844" className={styles.link}>
                +385 98 223 844
              </a>
            </div>
          </div>

          {/* Pravno */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Pravne informacije</h4>
            <div className={styles.list}>
              <span className={styles.legal}>OIB: —</span>
              <span className={styles.legal}>MBPG: —</span>
              <a href="#" className={styles.legalLink}>Politika privatnosti</a>
            </div>
          </div>

        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} OPG Kulin Ćorić &mdash; Sva prava pridržana
          </p>
        </div>
      </Container>
    </footer>
  )
}
