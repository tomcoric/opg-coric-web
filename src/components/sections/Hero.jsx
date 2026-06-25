import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const headlines = [
  { before: 'Dobro došli u srce ', em: 'slavonske', after: ' tradicije' },
  { before: 'Tradicija koja se ', em: 'nasljeđuje', after: '' },
  { before: 'Pravi okus ', em: 'Slavonije', after: ' — direktno k vama' },
  { before: 'Kulin po receptu ', em: 'predaka', after: '' },
  { before: 'Dim, sol i ', em: 'strast', after: ' od 1987.' },
  { before: 'Okus koji ', em: 'pamtite', after: ' zauvijek' },
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
      <div className={styles.bg} style={{ backgroundImage: 'url(/images/title-slika.jpg)' }} />
      <div className={styles.overlay} />

      <div className={styles.logoGroup}>
        <div className={styles.logoGlow} />
        <div className={styles.logoWrapper}>
          <img src="/images/kulin_coric_donja_kruna_listovi_30posto_povecano_i_kompaktno.png" alt="Kulin Ćorić" className={styles.logo} />
        </div>
        <h1 className={`${styles.title} ${visible ? styles.visible : styles.hidden}`}>
          {headlines[current].before}<em>{headlines[current].em}</em>{headlines[current].after}
        </h1>
      </div>

      <div className={styles.content}>
        <div className={styles.actions}>
          <a href="#kontakt" className={styles.ctaPrimary}>Naruči proizvod</a>
        </div>
        <div className={styles.trust}>
          <span className={styles.trustItem}><ShieldIcon />EU IGP zaštita</span>
        </div>
      </div>
    </section>
  )
}