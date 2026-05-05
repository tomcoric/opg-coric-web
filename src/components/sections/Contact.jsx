import { useState } from 'react'
import Container from '../ui/Container'
import styles from './Contact.module.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSent(true) }

  return (
    <section id="kontakt" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.label}>Kontakt</span>
            <h2>Kontaktirajte nas</h2>
            <p className={styles.subtitle}>Imate pitanja o proizvodima ili narudžbama? Javite nam se.</p>
          </div>

          <div className={styles.grid}>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <strong>Adresa</strong>
                <a href="https://www.google.com/maps?q=Miroslava+Krleže+2,+31400+Đakovo" target="_blank" rel="noopener noreferrer">
                  Miroslava Krleže 2, 31400 Đakovo
                </a>
              </div>
              <div className={styles.infoItem}>
                <strong>E-mail</strong>
                <a href="mailto:opgcoricvladimir@gmail.com">opgcoricvladimir@gmail.com</a>
              </div>
              <div className={styles.infoItem}>
                <strong>Za sve informacije</strong>
                <span>Vladimir Ćorić</span>
                <a href="tel:+38598223844">+385 98 223 844</a>
              </div>
            </div>

            <div className={styles.formWrap}>
              {sent ? (
                <div className={styles.success}>
                  <p>✓ Poruka je poslana. Javit ćemo vam se uskoro.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.field}>
                    <label htmlFor="name">Ime i prezime</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Ivan Horvat" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="ivan@email.com" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="message">Poruka</label>
                    <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} required placeholder="Vaša poruka..." />
                  </div>
                  <button type="submit" className={styles.submit}>Pošalji poruku</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
