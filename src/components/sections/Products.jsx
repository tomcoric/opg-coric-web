import { useState, useEffect, useCallback } from 'react'
import Container from '../ui/Container'
import styles from './Products.module.css'

const products = [
  {
    name: 'Đakovački Kulin',
    img: '/images/proizvodi/kulin_1.webp',
    desc: 'Kralj slavonskog stola. Od birane svinjetine i leđne slanine, uz dodatak paprike, češnjaka i soli, nastaje delicija koja se polako dimi na bukovu drvu i dozrijeva najmanje 5 do 6 mjeseci. Punog okusa, plemenite arome i autentičnog slavonskog karaktera.',
  },
  {
    name: 'Đakovačka Kulinova Seka',
    img: '/images/proizvodi/seka.webp',
    desc: 'Tanja verzija kulina, jednako bogata okusom. Izrađena po istoj recepturi, punjena u tanje crijevo — savršena za svaki stol.',
    soldOut: true,
  },
  {
    name: 'Đakovačka Kobasica',
    img: '/images/proizvodi/kobasica.webp',
    desc: 'Od biranog svježeg svinjskog mesa, uz skladan omjer slatke i ljute paprike, češnjaka i soli, nastaje kobasica punog okusa, profinjene arome i prepoznatljivog karaktera domaće slavonske kuhinje.',
  },
  {
    name: 'Đakovačka Slanina',
    img: '/images/proizvodi/slanina.webp',
    desc: 'Dimljena svinjska slanina s tankim slojevima mesa. Bogata aromom dima, idealna uz domaći kruh ili kao dodatak jelima.',
  },
  {
    name: 'Đakovačka Buđola',
    img: '/images/proizvodi/budola.webp',
    desc: 'Suhomesnata delicija od svinjskog vrata, blage začinjenosti i fine teksture. Dugim zrenjem dobiva prepoznatljiv okus.',
  },
  {
    name: 'Đakovačka Pečenica',
    img: '/images/proizvodi/pecenica.webp',
    desc: 'Dimljena svinjska pečenica — nježnog mesa i lagane, ugodne arome. Jedna od omiljenih slavonskih delicija.',
    soldOut: true,
  },
]

export default function Products() {
  const [active, setActive] = useState(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  return (
    <section id="proizvodi" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <span className={styles.label}>Ponuda</span>
          <h2>Naši <em>proizvodi</em></h2>
        </div>

        <div className={styles.grid}>
          {products.map(p => (
            <div
              key={p.name}
              className={styles.card}
              onClick={() => p.img && setActive(p)}
              role={p.img ? 'button' : undefined}
              tabIndex={p.img ? 0 : undefined}
              onKeyDown={e => e.key === 'Enter' && p.img && setActive(p)}
              aria-label={p.img ? `Otvori sliku: ${p.name}` : undefined}
            >
              <div className={styles.imgWrap}>
                {p.img
                  ? <img src={p.img} alt={p.name} className={`${styles.img} ${p.soldOut ? styles.imgSoldOut : ''}`} loading="lazy" decoding="async" />
                  : <div className={styles.placeholder}><span>Fotografija uskoro</span></div>
                }
                {p.soldOut && <span className={styles.soldOutRibbon}>Rasprodano</span>}
                <div className={styles.overlay}>
                  <p className={styles.desc}>{p.desc}</p>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.rule} />
                <h3 className={styles.name}>{p.name}</h3>
              </div>
              <p className={styles.mobileDesc}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#kontakt" className={styles.ctaBtn}>Naruči proizvod</a>
        </div>
      </Container>

      {active && (
        <div className={styles.lightbox} onClick={close} role="dialog" aria-modal="true" aria-label={active.name}>
          <button className={styles.lightboxClose} onClick={close} aria-label="Zatvori">✕</button>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <img src={active.img} alt={active.name} className={styles.lightboxImg} />
            <div className={styles.lightboxCaption}>
              <h3 className={styles.lightboxName}>{active.name}</h3>
              <p className={styles.lightboxDesc}>{active.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
