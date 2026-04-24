import Container from '../ui/Container'
import styles from './FeatureBanner.module.css'

const features = [
  { icon: '🌾', title: 'Tradicijski uzgoj', desc: 'Metode naših predaka uz suvremenu higijenu i kontrolu kvalitete.' },
  { icon: '🚫', title: 'Bez aditiva', desc: 'Samo prirodni sastojci — bez konzervansa, pojačivača okusa i boja.' },
  { icon: '📦', title: 'Direktna dostava', desc: 'Naručite i primite svježe proizvode na kućnu adresu.' },
  { icon: '🏆', title: 'Nagrađivana kvaliteta', desc: 'Prepoznati na regionalnim sajmovima i izložbama domaćih proizvoda.' },
]

export default function FeatureBanner() {
  return (
    <section className={styles.banner}>
      <Container>
        <div className={styles.grid}>
          {features.map(f => (
            <div key={f.title} className={styles.item}>
              <span className={styles.icon}>{f.icon}</span>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
