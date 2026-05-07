import Container from '../ui/Container'
import styles from './KulinInfo.module.css'

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-2.8 3.5-5 6.5-5 10a5 5 0 0 0 10 0c0-3.5-2.2-6.5-5-10z" />
    <path d="M12 14a2 2 0 0 1-2-2c0-1.5 2-3 2-3s2 1.5 2 3a2 2 0 0 1-2 2z" />
  </svg>
)

const HourglassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 2h14M5 22h14" />
    <path d="M5 2l7 9 7-9" />
    <path d="M5 22l7-9 7 9" />
    <path d="M12 13v.01" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 7v5c0 5.25 3.8 10.15 9 11.25C17.2 22.15 21 17.25 21 12V7L12 2z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const cards = [
  {
    Icon: LeafIcon,
    title: 'Sastojci',
    desc: 'Svinjsko meso, svinjska leđna masnoća (10%), mljevena crvena paprika, češnjak, sol — i ništa više. Bez konzervansa, bez aditiva.',
  },
  {
    Icon: FlameIcon,
    title: 'Dimljenje',
    desc: 'Toplo ili hladno dimljenje bukvom ili grabom, nekoliko tjedana. Dim daje karakterističnu aromu i boju — nema prečice.',
  },
  {
    Icon: HourglassIcon,
    title: 'Zrenje',
    desc: 'Nakon dimljenja kulin dozrijeva u hladnom i prozračnom prostoru. Pravi kulin zrije najmanje 5 do 6 mjeseci.',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'Zaštita EU',
    desc: '„Slavonski kulen / Slavonski kulin" nosi zaštićenu oznaku izvornosti EU — priznanje autentičnosti i tradicije slavonskog kraja.',
  },
]

export default function KulinInfo() {
  return (
    <section id="sto-je-kulin" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.label}>Tradicija</span>
            <h2>Što je <em>kulin?</em></h2>
          </div>

          <div className={styles.body}>
            <p>
              <strong>Kulin</strong> je tradicionalna slavonska suhomesnata delicija — kobasica izrađena od
              svinjetine i svinjske leđne masnoće (10%), začinjena mljevenom paprikom, češnjakom i solju,
              punjena u svinjsko crijevo i dimljena bukvom ili grabom koji joj daju prepoznatljivu dimljenu notu.
            </p>
            <p>
              Svaki kulin je ručni rad. Meso se priprema prema obiteljskim recepturama koje se prenose s
              koljena na koljeno, a proces sušenja traje tjednima — strpljenje i znanje razlikuju dobar
              kulin od izvrsnog.
            </p>
            <p>
              Slavonija je oduvijek bila zemlja svinjogojstva i mesnih delicija. Kulin nije samo hrana —
              on je simbol slavonskog identiteta, gostoljubivosti i ponosa na vlastitu zemlju.
            </p>

            <h3 className={styles.subheading}>Kulin ili kulen — koja je razlika?</h3>
            <p>
              U Slavoniji se oduvijek nije pričalo samo o hrani, nego o običajima, obitelji i naslijeđu.
              Zato kod nas nije neobično što se češće kaže kulin, a ne kulen — ta riječ nosi duh kraja,
              domaću riječ, miris zime i starih recepata. Zaštićeni naziv na europskoj razini glasi{' '}
              <strong>„Slavonski kulen / Slavonski kulin"</strong>, što potvrđuje da su oba naziva
              ravnopravna i ukorijenjena u istoj tradiciji.
            </p>
          </div>

          <div className={styles.cards}>
            {cards.map(({ Icon, title, desc }) => (
              <div key={title} className={styles.card}>
                <span className={styles.icon}><Icon /></span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
