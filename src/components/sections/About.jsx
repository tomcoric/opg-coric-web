import Container from '../ui/Container'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="o-nama" className={styles.about}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.label}>O nama</span>
            <h2>OPG Kulin Ćorić</h2>
          </div>

          <div className={styles.body}>
            <p>
              Drago mi je da vas mogu pozdraviti u ime OPG-a Kulin Ćorić i zaželjeti vam dobrodošlicu
              na web stranici kojom želimo naš OPG približiti, prezentirati i pozvati sve zainteresirane
              da nas posjete ili naruče naše proizvode.
            </p>
            <p>
              Ovim stranicama želimo vam na transparentan način približiti rad OPG-a, upoznati vas
              sa aktivnostima koje provodimo te vas upoznati s kvalitetom i tradicijom naše proizvodnje.
            </p>
            <p>
              Više od petnaest godina u Đakovu proizvodimo kvalitetni slavonski kulin. Baveći se
              uzgojem svinja i preradi svinjetine prema tradicionalnim recepturama, nastavljamo
              obiteljsku tradiciju koja datira još iz vremena naših predaka. Svaki naš proizvod
              nastaje ručnom izradom, bez konzervansa i aditiva — samo svinjsko meso, paprika,
              češnjak i sol.
            </p>
            <p>
              OPG je osnovan s ciljem da zaštiti i promovira autohtonih, tradicionalnih suhomesnatih
              proizvoda Slavonije. Kao ponosi član Udruge kulinara „Đakovački kulin", redovito
              sudjelujemo na ocjenjivanjima i natjecanjima diljem Slavonije.
            </p>
            <p>
              Naši proizvodi su prepoznati i nagrađivani na regionalnim i nacionalnim razinama.
              Predsjednik OPG-a, Vladimir Ćorić, aktivno sudjeluje u promociji slavonske gastronomske
              baštine i jedan je od vodećih proizvođača kulina u Đakovštini.
            </p>
          </div>

          <div className={styles.highlight}>
            <strong>Vladimir Ćorić, vlasnik OPG-a</strong>
          </div>
        </div>
      </Container>
    </section>
  )
}
