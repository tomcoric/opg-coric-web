import Container from '../ui/Container'
import styles from './Products.module.css'

const products = [
  {
    name: 'Kulin',
    img: '/images/proizvodi/kulin_1.png',
    desc: 'Kralj slavonskog stola. Od birane svinjetine i leđne slanine, uz dodatak paprike, češnjaka i soli, nastaje delicija koja se polako dimi na bukovu drvu i dozrijeva najmanje 5 do 6 mjeseci. Punog okusa, plemenite arome i autentičnog slavonskog karaktera.',
  },
  {
    name: 'Kulinova seka',
    img: null,
    desc: 'Tanja verzija kulina, jednako bogata okusom. Izrađena po istoj recepturi, punjena u tanje crijevo — savršena za svaki stol.',
  },
  {
    name: 'Domaća kobasica',
    img: null,
    desc: 'Od biranog svježeg svinjskog mesa, uz skladan omjer slatke i ljute paprike, češnjaka i soli, nastaje kobasica punog okusa, profinjene arome i prepoznatljivog karaktera domaće slavonske kuhinje.',
  },
  {
    name: 'Slanina',
    img: null,
    desc: 'Dimljena svinjska slanina s tankim slojevima mesa. Bogata aromom dima, idealna uz domaći kruh ili kao dodatak jelima.',
  },
  {
    name: 'Buđola',
    img: null,
    desc: 'Suhomesnata delicija od svinjskog vrata, blage začinjenosti i fine teksture. Dugim zrenjem dobiva prepoznatljiv okus.',
  },
  {
    name: 'Pečenica',
    img: null,
    desc: 'Dimljena svinjska pečenica — nježnog mesa i lagane, ugodne arome. Jedna od omiljenih slavonskih delicija.',
  },
]

export default function Products() {
  return (
    <section id="proizvodi" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <span className={styles.label}>Ponuda</span>
          <h2>Naši <em>proizvodi</em></h2>
        </div>

        <div className={styles.grid}>
          {products.map(p => (
            <div key={p.name} className={styles.card}>
              <div className={styles.imgWrap}>
                {p.img
                  ? <img src={p.img} alt={p.name} className={styles.img} />
                  : <div className={styles.placeholder}><span>Fotografija uskoro</span></div>
                }
                <div className={styles.overlay}>
                  <p className={styles.desc}>{p.desc}</p>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.rule} />
                <h3 className={styles.name}>{p.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#kontakt" className={styles.ctaBtn}>Naruči proizvod</a>
        </div>
      </Container>
    </section>
  )
}