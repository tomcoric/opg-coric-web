import { useState } from 'react'
import Container from '../ui/Container'
import styles from './Contact.module.css'

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21S5 14.5 5 9a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY ?? '')

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

  if (status === 'success') {
    return (
      <div className={styles.formCard}>
        <div className={styles.successState}>
          <span className={styles.successIcon}>✓</span>
          <h3>Upit je poslan!</h3>
          <p>Odgovorit ćemo što je prije moguće.</p>
          <button onClick={() => setStatus('idle')} className={styles.resetBtn}>
            Pošaljite novi upit
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>Pošaljite upit ili narudžbu</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.fieldLabel}>Ime i prezime *</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="Vaše ime"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone" className={styles.fieldLabel}>Telefon</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+385 xx xxx xxxx"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.fieldLabel}>E-mail *</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="vas@email.com"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="product" className={styles.fieldLabel}>Što vas zanima?</label>
          <select id="product" name="product" className={styles.input}>
            <option value="">Odaberite proizvod...</option>
            <option>Kulin</option>
            <option>Kulinova seka</option>
            <option>Domaća kobasica</option>
            <option>Slanina</option>
            <option>Buđola</option>
            <option>Pečenica</option>
            <option>Više proizvoda / upit</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="message" className={styles.fieldLabel}>Poruka *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Količina, dostava, pitanja..."
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>

        {status === 'error' && (
          <p className={styles.errorMsg}>
            Greška pri slanju. Nazovite nas na{' '}
            <a href="tel:+38598223844">+385 98 223 844</a>.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className={styles.submitBtn}
        >
          {status === 'sending' ? (
            <><span className={styles.spinner} />Šalje se...</>
          ) : (
            'Pošalji upit'
          )}
        </button>
      </form>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="kontakt" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.label}>Kontakt</span>
            <h2>Kontaktirajte <em>nas</em></h2>
          </div>

          <div className={styles.layout}>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}><MapPinIcon /></span>
                <div className={styles.infoText}>
                  <strong>Adresa</strong>
                  <a href="https://www.google.com/maps?q=Miroslava+Krleže+2,+31400+Đakovo"
                    target="_blank" rel="noopener noreferrer">
                    Miroslava Krleže 2, 31400 Đakovo
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}><MailIcon /></span>
                <div className={styles.infoText}>
                  <strong>E-mail</strong>
                  <a href="mailto:opgcoricvladimir@gmail.com">opgcoricvladimir@gmail.com</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}><PhoneIcon /></span>
                <div className={styles.infoText}>
                  <strong>Za sve informacije</strong>
                  <a href="tel:+38598223844">+385 98 223 844</a>
                  <a href="tel:+385981692161">+385 98 169 2161</a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
