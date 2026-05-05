import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const headlines = [
  'Dobro došli na mjesto gdje se okus nasljeđuje.',
  'Dobro došli na mjesto gdje tradicija postaje okus.',
  'Dobro došli tamo gdje dim miriše na djetinjstvo, a svaki zalogaj na topli dom.',
  'Dobro došli na mjesto gdje tradicija postaje stvarnost.',
  'Dobro došli u srce slavonske tradicije.',
  'Dobro došli na mjesto gdje tradicija sazrijeva u vrhunski okus.',
  'Dobro došli u svijet pravog slavonskog okusa.',
]

const INTERVAL = 15000

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

      <div className={styles.content}>
        <img src="/images/logo_veliki.png" alt="OPG Kulin Ćorić" className={styles.logo} />
        <h1 className={`${styles.title} ${visible ? styles.visible : styles.hidden}`}>
          {headlines[current]}
        </h1>
        <p className={styles.subtitle}>
          Čuvamo tradiciju slavonskog kulina i promičemo kvalitetu domaćih proizvoda već više od petnaest godina.
        </p>
        <a href="#o-nama" className={styles.cta}>Saznaj više</a>
      </div>
    </section>
  )
}
