import Container from '../ui/Container'
import styles from './KulinInfo.module.css'

export default function KulinInfo() {
  return (
    <section id="sto-je-kulin" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.label}>Tradicija</span>
            <h2>Što je kulin?</h2>
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
              U Slavoniji se oduvijek nije pričalo samo o hrani, nego o običajima, obitelji i naslijeđu
              koje se prenosi s koljena na koljeno. Zato kod nas nije neobično što se češće kaže kulin,
              a ne kulen. Ta riječ ne nosi samo naziv proizvoda, nego i duh kraja, domaću riječ, miris
              zime, pušnice i starih recepata koji su se čuvali u svakoj kući.
            </p>
            <p>
              Iako se u standardnim jezičnim izvorima češće susreće oblik kulen, isti izvori navode i
              kulin kao istoznačan naziv. Drugim riječima, kad u Slavoniji kažemo kulin, govorimo
              autentično, prirodno i u skladu s tradicijom svoga kraja.
            </p>
            <p>
              To potvrđuju i službeni izvori. Zaštićeni naziv proizvoda na hrvatskom i europskoj razini
              glasi <strong>„Slavonski kulen / Slavonski kulin"</strong>, što jasno pokazuje da su oba
              naziva priznata, ravnopravna i ukorijenjena u istoj tradiciji.
            </p>
            <p>
              Zato, kada mi kažemo kulin, ne biramo samo jednu riječ umjesto druge. Mi biramo govor
              svoga kraja. Biramo tradiciju Slavonije. Biramo naziv koji zvuči domaće, toplo i istinski,
              onako kako su ga izgovarali naši stari.
            </p>
            <p>
              Za nas, kulin nije samo delicija. On je dio slavonskoga stola, dio običaja i dio priče o
              kraju iz kojega dolazimo. Na našem je stolu slavonski kulin – riječ našega kraja, okus
              naše tradicije i ponos naše Slavonije.
            </p>
          </div>

          <div className={styles.cards}>
            <div className={styles.card}>
              <span className={styles.icon}>🌶️</span>
              <h4>Sastojci</h4>
              <p>Svinjsko meso, svinjska leđna masnoća (10%), mljevena crvena paprika (slatka i ljuta), češnjak, sol — i ništa više. Bez konzervansa, bez aditiva.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>🔥</span>
              <h4>Dimljenje</h4>
              <p>Toplo ili hladno dimljenje bukvom ili grabom, nekoliko tjedana. Dim daje karakterističnu aromu i boju — nema prečice.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>⏳</span>
              <h4>Zrenje</h4>
              <p>Nakon dimljenja kulin dozrijeva u hladnom i prozračnom prostoru. Pravi kulin zrije najmanje 5 do 6 mjeseci.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>🏅</span>
              <h4>Zaštita EU</h4>
              <p>„Slavonski kulen / Slavonski kulin" nosi zaštićenu oznaku izvornosti EU — priznanje autentičnosti i tradicije slavonskog kraja.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
