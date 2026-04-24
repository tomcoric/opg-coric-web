import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import styles from './About.module.css'

const values = [
  { icon: '🌱', title: 'Prirodno uzgojeno', desc: 'Bez pesticida i umjetnih gnojiva — samo čista zemlja i sunce.' },
  { icon: '🤝', title: 'Direktna prodaja', desc: 'Od naše farme do vašeg stola, bez posrednika.' },
  { icon: '❤️', title: 'Obiteljska tradicija', desc: 'Generacijama prenosimo ljubav prema zemlji i domaćim proizvodima.' },
]

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageCol}>
            <div className={styles.imageWrap}>
              <img src="/images/katedrala.png" alt="OPG Kulin Ćorić farma" className={styles.mainImg} />
              <div className={styles.badge}>
                <img src="/images/logo_udruge_HD.png" alt="Logo" className={styles.badgeLogo} />
                <span>Certificirani<br />proizvođač</span>
              </div>
            </div>
          </div>

          <div className={styles.textCol}>
            <SectionTitle
              label="O nama"
              title="Priča naše farme"
              subtitle="OPG Kulin Ćorić je obiteljsko poljoprivredno gospodarstvo s dugogodišnjom tradicijom uzgoja kvalitetnih domaćih proizvoda."
              align="left"
            />

            <p className={styles.body}>
              Smješteni u srcu prirode, njegujemo tradiciju naših predaka uz primjenu suvremenih metoda uzgoja.
              Svaki naš proizvod nastaje s pažnjom i posvećenošću — jer vjerujemo da zdrava zemlja rađa zdrave ljude.
            </p>

            <div className={styles.values}>
              {values.map(v => (
                <div key={v.title} className={styles.valueItem}>
                  <span className={styles.valueIcon}>{v.icon}</span>
                  <div>
                    <strong>{v.title}</strong>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button href="#contact" variant="primary">Kontaktiraj nas</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
