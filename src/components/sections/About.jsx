import Container from '../ui/Container'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="o-nama" className={styles.about}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <img src="/images/katedrala.png" alt="" aria-hidden="true" className="cathedralHeader" />
            <span className={styles.label}>O nama</span>
            <h2>OPG Kulin <em>Ćorić</em></h2>
          </div>

          <div className={styles.body}>
            <p>
              Više od petnaest godina u Đakovu proizvodimo kvalitetni slavonski kulin. Svaki naš
              proizvod nastaje ručnom izradom, bez konzervansa i aditiva — samo svinjsko meso,
              paprika, češnjak i sol, prema recepturama koje su se prenosile s koljena na koljeno.
            </p>
            <p>
              OPG je osnovan s ciljem zaštite i promocije autohtonih suhomesnatih proizvoda
              Slavonije. Kao ponosni član Udruge kulinara „Đakovački kulin", redovito sudjelujemo
              na ocjenjivanjima i natjecanjima diljem regije.
            </p>
            <p>
              Naši proizvodi prepoznati su i nagrađivani na regionalnim i nacionalnim razinama.
              Na čelu OPG-a stoji <em className={styles.name}>Vladimir Ćorić</em>, jedan od vodećih
              proizvođača kulina u Đakovštini i aktivni promicatelj slavonske gastronomske baštine.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
