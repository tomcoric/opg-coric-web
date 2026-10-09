import { useState, useEffect } from 'react'
import styles from './NotifyModal.module.css'

export default function NotifyModal({ productName, onClose }) {
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY ?? '')
    formData.append('tip_upita', 'Obavijesti me o dostupnosti')
    formData.append('proizvod', productName)
    formData.append('subject', `Obavijesti me o dostupnosti — ${productName}`)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Obavijesti me o dostupnosti — ${productName}`}
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Zatvori">✕</button>

        {status === 'success' ? (
          <div className={styles.successState}>
            <span className={styles.successIcon}>✓</span>
            <p>Hvala! Obavijestit ćemo vas čim proizvod ponovno bude dostupan.</p>
          </div>
        ) : (
          <>
            <h3 className={styles.title}>Obavijesti me o dostupnosti</h3>
            <p className={styles.text}>Ostavite svoju e-mail adresu i obavijestit ćemo vas čim proizvod ponovno bude dostupan.</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="notify-email" className={styles.fieldLabel}>E-mail adresa</label>
                <input
                  id="notify-email"
                  type="email"
                  name="email"
                  required
                  placeholder="vas@email.com"
                  className={styles.input}
                  disabled={status === 'sending'}
                />
              </div>

              {status === 'error' && (
                <p className={styles.errorMsg}>Došlo je do greške pri slanju. Pokušajte ponovno.</p>
              )}

              <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
                {status === 'sending' && <span className={styles.spinner} />}
                Obavijesti me
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
