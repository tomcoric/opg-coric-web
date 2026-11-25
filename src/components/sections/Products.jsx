import { useState, useEffect, useCallback } from 'react'
import Container from '../ui/Container'
import { scrollToAnchor } from '../../utils/scrollToAnchor'
import NotifyModal from './NotifyModal'
import { siteProducts } from '../../data/catalog'
import styles from './Products.module.css'

const products = siteProducts.map(p => ({
  ...p,
  soldOut: !p.available,
  newSeason: p.available && p.newSeason,
}))

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
                  ? <img src={p.img} alt={p.name} className={styles.img} loading="lazy" decoding="async" />
                  : <div className={styles.placeholder}><span>Fotografija uskoro</span></div>
                }
                {p.soldOut && <span className={styles.soldOutTag}>Nova sezona uskoro</span>}
                {p.newSeason && <span className={styles.newSeasonTag}>Nova sezona</span>}
                <div className={styles.overlay}>
                  <p className={styles.desc}>{p.desc}</p>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.rule} />
                <h3 className={styles.name}>{p.name}</h3>
              </div>
              <p className={styles.mobileDesc}>{p.desc}</p>
              {p.soldOut && (
                <p className={styles.soldOutNote}>
                  <strong>Nova sezona uskoro.</strong> Trenutna zaliha je rasprodana, novi proizvodi iz ovogodišnje proizvodnje uskoro će biti dostupni.
                </p>
              )}
              {p.newSeason && (
                <p className={styles.soldOutNote}>
                  <strong>Ponovno dostupno.</strong> {p.note || 'Stiglo je iz ovogodišnje proizvodnje.'}
                </p>
              )}
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
