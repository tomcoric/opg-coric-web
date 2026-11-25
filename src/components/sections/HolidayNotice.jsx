import Container from '../ui/Container'
import { scrollToAnchor } from '../../utils/scrollToAnchor'
import styles from './HolidayNotice.module.css'

// Blagdanska obavijest. Prikazuje se do kraja dana DEADLINE (po hrvatskom vremenu),
// nakon toga sama nestaje — nije potrebno ništa mijenjati ni objavljivati.
// Za sljedeću godinu dovoljno je promijeniti datum i tekst.
const DEADLINE = '2026-12-15'
const DEADLINE_LABEL = '15. prosinca'

function isBeforeDeadline() {
  const todayInZagreb = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zagreb' }).format(new Date())
  return todayInZagreb <= DEADLINE
}

export default function HolidayNotice() {
  if (!isBeforeDeadline()) return null

  return (
    <aside className={styles.notice} aria-label="Blagdanske narudžbe">
      <Container>
        <div className={styles.inner}>
          <p className={styles.text}>
            <span className={styles.label}>Blagdani</span>
            Božićne narudžbe primamo do <strong>{DEADLINE_LABEL}</strong>. Javite nam se na vrijeme
            da vaš kulin stigne za blagdanski stol.
          </p>
          <a
            href="#kontakt"
            className={styles.cta}
            onClick={e => { e.preventDefault(); scrollToAnchor('#kontakt') }}
          >
            Naruči za blagdane
          </a>
        </div>
      </Container>
    </aside>
  )
}
