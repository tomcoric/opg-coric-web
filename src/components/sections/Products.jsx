import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import styles from './Products.module.css'

const products = [
  {
    id: 1,
    name: 'Domaći med',
    desc: 'Čisti prirodni med iz naših košnica, bogat vitaminima i hranjivim tvarima.',
    tag: 'Bestseler',
    img: '/images/Spice-backgrounds.jpg',
  },
  {
    id: 2,
    name: 'Svježe povrće',
    desc: 'Sezonsko povrće uzgojeno bez pesticida, ubrano u pravom trenutku.',
    tag: 'Sezonski',
    img: '/images/title-slika.jpg',
  },
  {
    id: 3,
    name: 'Domaći sir',
    desc: 'Tradicionalno pripremljen sir od svježeg mlijeka naših krava.',
    tag: 'Novo',
    img: '/images/Spice-backgrounds.jpg',
  },
  {
    id: 4,
    name: 'Zimnica',
    desc: 'Domaće pekmeze, džemove i ukiseljeno povrće prema starim receptima.',
    tag: null,
    img: '/images/title-slika.jpg',
  },
]

export default function Products() {
  return (
    <section id="products" className={styles.products}>
      <Container>
        <SectionTitle
          label="Naši proizvodi"
          title="Sve s naše farme"
          subtitle="Odabrali smo samo ono najkvalitetnije što naša zemlja može ponuditi."
        />

        <div className={styles.grid}>
          {products.map(product => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={product.img} alt={product.name} className={styles.img} />
                {product.tag && <span className={styles.tag}>{product.tag}</span>}
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.desc}>{product.desc}</p>
                <a href="#contact" className={styles.cta}>Naruči →</a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
