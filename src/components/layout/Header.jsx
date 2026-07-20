import { useState, useEffect } from 'react'
import Container from '../ui/Container'
import styles from './Header.module.css'

const navLeft = [
  { href: '#hero',         label: 'Naslovnica' },
  { href: '#o-nama',       label: 'O nama' },
  { href: '#sto-je-kulin', label: 'Što je kulin?' },
]

const navRight = [
  { href: '#proizvodi', label: 'Proizvodi' },
  { href: '#mediji',    label: 'Mediji' },
]

const allLinks = [...navLeft, ...navRight, { href: '#kontakt', label: 'Kontakt' }]

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
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <Container className={styles.inner}>

          {/* Lijeva navigacija — samo desktop */}
          <nav className={styles.navLeft}>
            {navLeft.map(link => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Logo — centar */}
          <a href="/" className={styles.brand}>
            <img src="/images/logo_final.webp" alt="Kulin Ćorić" className={styles.brandLogo} />
          </a>

          {/* Desna navigacija — samo desktop */}
          <nav className={styles.navRight}>
            {navRight.map(link => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
            <a href="#kontakt" className={styles.navCta}>Kontakt</a>
          </nav>

          {/* Hamburger — samo mobile */}
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
      </header>

      {/* Mobile overlay — VAN <header> da backdrop-filter ne blokira position:fixed */}
      <nav className={`${styles.mobileNav} ${menuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileRule} />
        {allLinks.map(link => (
          <a key={link.href} href={link.href} className={styles.mobileLink} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  )
}
