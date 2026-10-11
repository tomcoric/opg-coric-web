import { useState, useEffect } from 'react'
import { scrollToAnchor } from '../../utils/scrollToAnchor'
import styles from './Hero.module.css'

// Prvi naslov (index 0) je ono što Googlebot vidi u H1-u pri inicijalnom renderu
// (rotacija kreće tek nakon 15s) — zato namjerno nosi "kulen", "kulin" i "Đakovo".
const headlines = [
  { before: 'Tradicionalni slavonski ', em: 'kulin', after: ' (kulen) iz Đakova' },
  { before: 'Dobro došli u srce ', em: 'slavonske', after: ' tradicije' },
  { before: 'Pravi okus ', em: 'Slavonije', after: ' — direktno k vama' },
  { before: 'Kulin po receptu ', em: 'predaka', after: '' },
  { before: 'Okus koji ', em: 'pamtite', after: ' zauvijek' },
  { before: 'Iz srca ', em: 'Slavonije', after: ' na vaš stol' },
  { before: 'Gdje tradicija postaje ', em: 'okus', after: '' },
  { before: 'Slavonija u svakom ', em: 'zalogaju', after: '' },
  { before: 'Okus ', em: 'tradicije', after: ' koji traje' },
  { before: 'Stoljećima čuvana ', em: 'receptura', after: '' },
  { before: 'Iz slavonskog srca, s ', em: 'ljubavlju', after: '' },
  { before: 'Tamo gdje se čuva ', em: 'tradicija', after: '' },
  { before: 'Kralj slavonskog stola — ', em: 'kulin', after: '' },
  { before: 'Vrhunski ', em: 'kulin', after: ' iz srca Slavonije' },
  { before: 'Umijeće stvaranja pravog ', em: 'kulina', after: '' },
  { before: 'Autentičan okus domaćeg ', em: 'kulina', after: '' },
  { before: 'Vrijeme stvara ', em: 'kvalitetu', after: '' },
  { before: 'Pravi ', em: 'kulin', after: ' ne poznaje prečace' },
  { before: 'Strpljenjem do ', em: 'savršenstva', after: '' },
  { before: 'Receptura koja spaja ', em: 'generacije', after: '' },
  { before: 'Okus koji se ', em: 'nasljeđuje', after: '' },
  { before: 'Obiteljska tradicija, vrhunski ', em: 'okus', after: '' },
  { before: 'Iz naše ', em: 'obitelji', after: ' na vaš stol' },
  { before: 'Čuvamo ono što je ', em: 'vrijedno', after: '' },
  { before: 'Generacijama vjerni ', em: 'tradiciji', after: '' },
]

const INTERVAL = 15000

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1L2 3.5v3.5c0 2.8 2.2 4.8 5 5.5 2.8-.7 5-2.7 5-5.5V3.5L7 1z" />
    </svg>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (headlines.length <= 1) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % headlines.length)
        setVisible(true)
      }, 500)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} style={{ backgroundImage: 'url(/images/title-slika.webp)' }} />
      <div className={styles.overlay} />

      <div className={styles.logoGroup}>
        <p className={styles.brandLine}>OPG Ćorić Vladimir · Đakovo</p>
        <h1 className={`${styles.title} ${visible ? styles.visible : styles.hidden}`}>
          {headlines[current].before}<em>{headlines[current].em}</em>{headlines[current].after}
        </h1>
      </div>

      <div className={styles.content}>
        <div className={styles.actions}>
          <a href="#proizvodi" className={styles.ctaPrimary} onClick={e => { e.preventDefault(); scrollToAnchor('#proizvodi') }}>Proizvodi</a>
        </div>
        <div className={styles.trust}>
          <span className={styles.trustItem}><ShieldIcon />EU IGP zaštita</span>
        </div>
      </div>
    </section>
  )
}