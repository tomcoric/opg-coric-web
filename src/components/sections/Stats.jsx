import Container from '../ui/Container'
import styles from './Stats.module.css'

function CrownDivider() {
  return (
    <div className={styles.divider}>
      <span className={styles.dividerLine} />
      <svg className={styles.dividerCrown} width="20" height="13" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 15h22" />
        <path d="M2 14L5.5 6 9 10.5 12 3 15 10.5 18.5 6 22 14" />
        <circle cx="5.5" cy="5.5" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="12" cy="2.5" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="18.5" cy="5.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
      <span className={styles.dividerLine} />
    </div>
  )
}

function WheatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="22" x2="12" y2="8" />
      <path d="M12 18c-1.5-2-4-1.5-5-3.5 2-.7 4 .5 5 2.5z" />
      <path d="M12 18c1.5-2 4-1.5 5-3.5-2-.7-4 .5-5 2.5z" />
      <path d="M12 14c-1.5-2-4-1.5-5-3.5 2-.7 4 .5 5 2.5z" />
      <path d="M12 14c1.5-2 4-1.5 5-3.5-2-.7-4 .5-5 2.5z" />
      <path d="M12 10c-1-1.5-3-1.2-4-2.5 1.5-.5 3.2.3 4 2z" />
      <path d="M12 10c1-1.5 3-1.2 4-2.5-1.5-.5-3.2.3-4 2z" />
    </svg>
  )
}

function SealIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="12" cy="10" r="7" />
      <circle cx="12" cy="10" r="3" />
      <line x1="9" y1="19" x2="15" y2="19" />
      <line x1="10.5" y1="17" x2="10.5" y2="20" />
      <line x1="13.5" y1="17" x2="13.5" y2="20" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11L12 3l9 8" />
      <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
      <path d="M10 21v-6h4v6" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.7 2 6 4.7 6 8.2c0 4.8 6 12.8 6 12.8s6-8 6-12.8C18 4.7 15.3 2 12 2z" />
      <circle cx="12" cy="8" r="2" />
    </svg>
  )
}

const stats = [
  { value: '15+',     label: 'Godina tradicije',  icon: <WheatIcon /> },
  { value: '2009.',   label: 'Početak OPG priče', icon: <SealIcon /> },
  { value: '100%',    label: 'Domaći proizvodi',  icon: <HomeIcon /> },
  { value: 'Đakovo', label: 'Srce Slavonije',     icon: <PinIcon /> },
]

export default function Stats() {
  return (
    <section className={styles.stats}>
      <Container>
        <CrownDivider />
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.icon}>{s.icon}</span>
              <strong className={styles.value}>{s.value}</strong>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
        <CrownDivider />
      </Container>
    </section>
  )
}
