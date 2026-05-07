import Container from '../ui/Container'
import styles from './FeatureBanner.module.css'

const Wheat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12" />
    <path d="M12 12C12 12 8 9.5 8 6a4 4 0 0 1 8 0c0 3.5-4 6-4 6z" />
    <path d="M9 17c-1.5 0-3-1-3-2.5S7.5 12 9 12" />
    <path d="M15 17c1.5 0 3-1 3-2.5S16.5 12 15 12" />
    <path d="M9 20c-1.5 0-3-1-3-2.5" />
    <path d="M15 20c1.5 0 3-1 3-2.5" />
  </svg>
)

const Leaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

const Truck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
    <rect x="9" y="11" width="14" height="10" rx="2" />
    <circle cx="12" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
  </svg>
)

const Medal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="6" />
    <path d="M12 8V2" />
    <path d="M8 2h8" />
    <path d="M9.5 14l1.5 1.5 3-3" />
  </svg>
)

const features = [
  {
    Icon: Wheat,
    title: 'Tradicijski uzgoj',
    desc: 'Metode naših predaka uz suvremenu higijenu i kontrolu kvalitete.',
  },
  {
    Icon: Leaf,
    title: 'Bez aditiva',
    desc: 'Samo prirodni sastojci — bez konzervansa, pojačivača okusa i boja.',
  },
  {
    Icon: Truck,
    title: 'Direktna dostava',
    desc: 'Naručite i primite svježe proizvode na kućnu adresu.',
  },
  {
    Icon: Medal,
    title: 'Nagrađivana kvaliteta',
    desc: 'Prepoznati na regionalnim sajmovima i izložbama domaćih proizvoda.',
  },
]

export default function FeatureBanner() {
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.grid}>
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className={styles.card}>
              <span className={styles.icon}><Icon /></span>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.desc}>{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
