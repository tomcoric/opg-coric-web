import Container from '../ui/Container'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="o-nama" className={styles.about}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.label}>O nama</span>
              <h2>OPG Kulin <em>Ćorić</em></h2>
            </div>
            <div className={styles.body}>
              <p>
                Pod imenom Kulin Ćorić već više od petnaest godina u Đakovu njegujemo bogatu
                slavonsku tradiciju i proizvodimo kvalitetne suhomesnate delicije prepoznatljive
                po autentičnom okusu domaće Slavonije.
              </p>
              <p>
                Vlasnik OPG-a Vladimir Ćorić, jedan od istaknutih proizvođača kulina u Đakovštini
                i aktivni promicatelj slavonske gastronomske baštine. Kroz svaki proizvod nastojimo
                prenijeti ono najvrjednije što Slavonija ima — miris domaćeg dima, punoću okusa,
                ručnu izradu i tradiciju koja se ne zaboravlja.
              </p>
              <p>
                Naša ponuda obuhvaća kulin, kulinovu seku, domaću kobasicu, šunku, slaninu,
                buđolu, pečenicu i druge tradicionalne proizvode. Svaka delicija nastaje ručnom
                izradom, prema provjerenim recepturama koje su se prenosile s koljena na koljeno.
              </p>
              <p>
                Posebnu pažnju posvećujemo sigurnosti hrane, kvaliteti sirovine i urednosti
                svakog koraka proizvodnog procesa. Proizvodnja je usklađena s HACCP sustavom,
                čime osiguravamo kontrolu od odabira mesa, pripreme i začinjavanja, preko
                dimljenja i zrenja, pa sve do pakiranja gotovog proizvoda.
              </p>
              <p>
                OPG Ćorić osnovan je s ciljem očuvanja, zaštite i promocije autohtonih slavonskih
                suhomesnatih proizvoda. Kao ponosni član Udruge kulinara „Đakovački kulin",
                redovito sudjelujemo na ocjenjivanjima i natjecanjima diljem regije, gdje su naši
                proizvodi prepoznati i nagrađivani na regionalnim i nacionalnim razinama.
              </p>
            </div>
          </div>
          <img src="/images/Otac_Vladimir.png" alt="Vladimir Ćorić" className={styles.photo} />
        </div>
      </Container>
    </section>
  )
}