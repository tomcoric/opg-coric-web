import Container from '../ui/Container'
import styles from './Media.module.css'

const articles = [
  {
    source: 'Visit Slavonia & Baranja',
    date: '31. 07. 2025.',
    title: 'Đakovo — Grad kulina: nazivali ga kulen, kulin ili kuljen, užitak je isti',
    desc: 'Đakovo je jedini grad na svijetu koji nosi titulu Grada kulina. Priča o lokalnim proizvođačima, regionalnim nazivima i razlici između autentičnog i industrijskog kulina.',
    href: 'https://visitslavoniabaranja.com/okusi-destinaciju/dakovo-grad-kulina-nazivali-ga-kulen-kulin-ili-kuljen-uzitak-je-isti/',
  },
  {
    source: 'Glas Slavonije',
    date: '07. 07. 2024.',
    title: 'Šampionski pehar za kulin Mesnice "Žera"',
    desc: 'Na 37. Kulinijadi u Đakovu, Mesnica „Žera" osvojila je prvo mjesto ispred OPG-a Adet iz Tenje. OPG Ćorić sudjelovao je na natjecanju.',
    href: 'https://glas-slavonije.hr/regija/2024/07/07/sampionski-pehar-za-kulin-mesnice-zera-438818/',
  },
  {
    source: 'Večernji list',
    date: '2023.',
    title: 'Ponos Slavonije: Većina ga zove kulin, ali za dva sela on je kuljen',
    desc: 'Slavonski suhomesnati specijalitet koji većina naziva kulinom — priča o tradiciji, identitetu i regionalnoj raznolikosti.',
    href: 'https://www.vecernji.hr/vijesti/ponos-slavonije-vecina-ga-zove-kulin-ali-za-dva-sela-on-je-kuljen-1643251',
  },
  {
    source: 'Općina Viškovci',
    date: '07. 12. 2020.',
    title: 'Primjer dobre prakse — OPG Vladimir Ćorić, Đakovo',
    desc: 'Predsjednik Udruge kulinara Vladimir Ćorić podijelio je iskustva o proizvodnji suhomesnatih proizvoda koji su prepoznati i na međunarodnom tržištu.',
    href: 'https://www.viskovci.hr/primjer-dobre-prakse-opg-vladimir-coric-dakovo/',
  },
  {
    source: 'Agroklub',
    date: '04. 12. 2017.',
    title: 'Koja je razlika između kulena i kulina?',
    desc: 'Stručni pregled razlika između kulena i kulina — od naziva i porijekla do načina pripreme i zaštićenih oznaka izvornosti Europske unije.',
    href: 'https://www.agroklub.com/stocarstvo/koja-je-razlika-izmedu-kulena-i-kulina/37718/',
  },
  {
    source: 'SiB.hr',
    date: '19. 10. 2022.',
    title: 'Bliže se kolinja, rastu i cijene slavonskih delicija',
    desc: 'Kako se bliži tradicionalno vrijeme kolinja, rastu i cijene slavonskih specijaliteta — slanina, kobasice i kulin.',
    href: 'https://sib.net.hr/vijesti/regija/76189/blize-se-kolinja-rastu-i-cijene-slavonskih-delicija-slanina-i-kobasica-na-100-a-kulen-na-260-kuna/',
  },
]

export default function Media() {
  return (
    <section id="mediji" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <img src="/images/katedrala.png" alt="" aria-hidden="true" className="cathedralHeader" />
          <span className={styles.label}>U medijima</span>
          <h2>Medijska <em>pokrivenost</em></h2>
        </div>

        <div className={styles.list}>
          {articles.map((a, i) => (
            <article key={i} className={styles.article}>
              <div className={styles.meta}>
                <span className={styles.source}>{a.source}</span>
                <span className={styles.date}>{a.date}</span>
              </div>
              <h3 className={styles.title}>{a.title}</h3>
              <p className={styles.desc}>{a.desc}</p>
              <a href={a.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                Pročitaj članak →
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
