import { useState, useEffect, useCallback } from 'react'
import Container from '../ui/Container'
import { scrollToAnchor } from '../../utils/scrollToAnchor'
import NotifyModal from './NotifyModal'
import styles from './Products.module.css'

const products = [
  {
    name: 'Đakovački Kulin',
    img: '/images/proizvodi/kulin_1.webp',
    desc: 'Kralj slavonskog stola, poznat i kao kulen. Od birane svinjetine i leđne slanine, uz dodatak paprike, češnjaka i soli, nastaje delicija koja se polako dimi na bukovu drvu i dozrijeva najmanje 5 do 6 mjeseci. Punog okusa, plemenite arome i autentičnog slavonskog karaktera.',
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
    soldOut: true,
  },
  {
    name: 'Đakovačka Slanina',
    img: '/images/proizvodi/slanina.webp',
    desc: 'Dimljena svinjska slanina s tankim slojevima mesa. Bogata aromom dima, idealna uz domaći kruh ili kao dodatak jelima.',
    soldOut: true,
  },
  {
    name: 'Đakovačka Buđola',
    img: '/images/proizvodi/budola.webp',
    desc: 'Suhomesnata delicija od svinjskog vrata, blage začinjenosti i fine teksture. Dugim zrenjem dobiva prepoznatljiv okus.',
    soldOut: true,
  },
  {
    name: 'Đakovačka Pečenica',
    img: '/images/proizvodi/pecenica.webp',
    desc: 'Dimljena svinjska pečenica — nježnog mesa i lagane, ugodne arome. Jedna od omiljenih slavonskih delicija.',
    soldOut: true,
  },
  {
    name: 'Đakovački Buncek',
    img: '/images/proizvodi/buncek.webp',
    desc: 'Klasik domaće slavonske kuhinje. Mesnat i sočan svinjski buncek pažljivo se soli i dimi kako bi dobio prepoznatljivu aromu i puni okus. Idealan je za polagano kuhanje ili pečenje, a posebno dobro pristaje uz kiseli kupus, grah i druga tradicionalna jela.',
    soldOut: true,
  },
  {
    name: 'Đakovačka Špic rebra',
    img: '/images/proizvodi/spic-rebra.webp',
    desc: 'Pravi izbor za bogata domaća jela. Mesnata svinjska špic rebra pažljivo se sole i dime, čime dobivaju izraženu aromu i prepoznatljiv okus dima. Posebno su ukusna kuhana uz grah, kiseli kupus, ričet ili druga slavonska variva.',
    soldOut: true,
  },
  {
    name: 'Đakovački Švargl',
    img: '/images/proizvodi/svargl.webp',
    desc: 'Tradicija koja se prepoznaje u svakom zalogaju. Priprema se prema tradicionalnoj recepturi od karakterističnih svinjskih dijelova, uz dodatak soli, papra, paprike i češnjaka. Punog je okusa, bogate domaće arome i prepoznatljivog presjeka koji ga čini pravim klasikom slavonskog stola.',
    soldOut: true,
  },
]

export default function Products() {
  const [active, setActive] = useState(null)
  const [notifyProduct, setNotifyProduct] = useState(null)

  const close = useCallback(() => setActive(null), [])

  const handleOrderClick = (e, productName) => {
    e.stopPropagation()
    const select = document.getElementById('product')
    if (select) select.value = productName
    scrollToAnchor('#kontakt')
  }

  const handleNotifyClick = (e, productName) => {
    e.stopPropagation()
    setNotifyProduct(productName)
  }

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
                {p.soldOut && (
                  <div className={styles.soldOutBadge}>
                    <strong className={styles.soldOutTitle}>Nova sezona uskoro</strong>
                    <p className={styles.soldOutText}>Trenutna zaliha je rasprodana. Novi proizvodi iz ovogodišnje proizvodnje uskoro će biti dostupni.</p>
                  </div>
                )}
                <div className={styles.overlay}>
                  <p className={styles.desc}>{p.desc}</p>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.rule} />
                <h3 className={styles.name}>{p.name}</h3>
              </div>
              <p className={styles.mobileDesc}>{p.desc}</p>
              {p.soldOut ? (
                <button
                  type="button"
                  className={styles.orderBtn}
                  onClick={e => handleNotifyClick(e, p.name)}
                >
                  Obavijesti me o dostupnosti
                </button>
              ) : (
                <a
                  href="#kontakt"
                  className={styles.orderBtn}
                  onClick={e => handleOrderClick(e, p.name)}
                >
                  Naruči proizvod
                </a>
              )}
            </div>
          ))}
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

      {notifyProduct && (
        <NotifyModal productName={notifyProduct} onClose={() => setNotifyProduct(null)} />
      )}
    </section>
  )
}
