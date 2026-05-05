import Container from '../ui/Container'
import styles from './Stats.module.css'

const stats = [
  { value: '15+',     label: 'Godina tradicije' },
  { value: '2009.',   label: 'Godina osnivanja' },
  { value: '100%',    label: 'Domaći proizvodi' },
  { value: 'Đakovo', label: 'Sjedište OPG-a' },
]

export default function Stats() {
  return (
    <section className={styles.stats}>
      <Container>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.item}>
              <strong className={styles.value}>{s.value}</strong>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
