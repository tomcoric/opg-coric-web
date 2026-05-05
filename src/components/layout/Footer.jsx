import Container from '../ui/Container'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.text}>
          OPG Kulin Ćorić &copy; {new Date().getFullYear()} &mdash; Sva prava pridržana
        </p>
      </Container>
    </footer>
  )
}
