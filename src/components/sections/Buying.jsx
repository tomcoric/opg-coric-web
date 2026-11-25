import Container from '../ui/Container'
import { scrollToAnchor } from '../../utils/scrollToAnchor'
import { buyingFaq } from '../../data/faq'
import styles from './Buying.module.css'

export default function Buying() {
  const handleLinkClick = (e, href) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    scrollToAnchor(href)
  }

  return (
    <section id="kupnja" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.label}>Kupnja i dostava</span>
            <h2>Česta <em>pitanja</em></h2>
          </div>

          <div className={styles.list}>
            {buyingFaq.map(({ question, answer, link }) => (
              <details key={question} className={styles.item}>
                <summary className={styles.question}>
                  <h3>{question}</h3>
                  <span className={styles.marker} aria-hidden="true" />
                </summary>
                <div className={styles.answer}>
                  <p>{answer}</p>
                  {link && (
                    <a href={link.href} className={styles.link} onClick={e => handleLinkClick(e, link.href)}>
                      {link.label} →
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
