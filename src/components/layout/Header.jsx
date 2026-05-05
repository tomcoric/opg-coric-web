import { useState, useEffect } from 'react'
import Container from '../ui/Container'
import styles from './Header.module.css'

const navLinks = [
  { href: '#hero',         label: 'Naslovnica' },
  { href: '#o-nama',       label: 'O nama' },
  { href: '#sto-je-kulin', label: 'Što je kulin?' },
  { href: '#mediji',       label: 'Mediji' },
  { href: '#kontakt',      label: 'Kontakt' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <a href="/" className={styles.logo}>
          <img src="/images/logo_veliki.png" alt="OPG Kulin Ćorić" className={styles.logoImg} />
          <span className={styles.logoText}>Kulin Ćorić</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className={styles.navLink} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className={styles.navCta} onClick={closeMenu}>Kontaktiraj nas</a>
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Otvori izbornik"
        >
          <span />
          <span />
          <span />
        </button>
      </Container>

      {menuOpen && <div className={styles.backdrop} onClick={closeMenu} />}
    </header>
  )
}
