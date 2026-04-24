import { useState } from 'react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import styles from './Contact.module.css'

const contactInfo = [
  { icon: '📍', label: 'Adresa', value: 'Vaša adresa, Grad, Hrvatska' },
  { icon: '📞', label: 'Telefon', value: '+385 XX XXX XXXX' },
  { icon: '✉️', label: 'Email', value: 'info@opg-coric.hr' },
  { icon: '🕐', label: 'Radno vrijeme', value: 'Pon – Sub: 7:00 – 18:00' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className={styles.contact}>
      <Container>
        <SectionTitle
          label="Kontakt"
          title="Javite nam se"
          subtitle="Imate pitanje o našim proizvodima? Rado ćemo vam odgovoriti."
        />

        <div className={styles.grid}>
          <div className={styles.infoCol}>
            <div className={styles.infoList}>
              {contactInfo.map(item => (
                <div key={item.label} className={styles.infoItem}>
                  <span className={styles.infoIcon}>{item.icon}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.social}>
              <p>Pratite nas na društvenim mrežama</p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">f</a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">ig</a>
              </div>
            </div>
          </div>

          <div className={styles.formCol}>
            {sent ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>✓</span>
                <h3>Poruka poslana!</h3>
                <p>Javit ćemo vam se u najkraćem mogućem roku.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label htmlFor="name">Ime i prezime</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ivan Horvat"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email adresa</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ivan@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="message">Poruka</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Vaša poruka..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" variant="primary">Pošalji poruku</Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
