// Proizvodi prikazani na stranici (kartice u sekciji "Proizvodi" i izbornik u kontakt formi).
//
// Dostupnost se NE upisuje ovdje — čita se iz products.json (polje "available"), istog izvora
// iz kojeg se generira službeni dnevni cjenik. Tako stranica i cjenik uvijek pokazuju isto.
// Za promjenu dostupnosti mijenja se samo products.json.
//
// priceIds: id-jevi iz products.json koje kartica pokriva. Kartica je dostupna ako je
// dostupan barem jedan od njih (npr. "Kobasica" pokriva tri vrste kobasica iz cjenika).
// newSeason: prikazuje oznaku "Nova sezona" na dostupnom proizvodu (marketinška oznaka).
// note: dodatna rečenica ispod oznake "Ponovno dostupno".
import priceList from './products.json'

const availability = new Map(priceList.products.map(p => [p.id, p.available]))

const catalog = [
  {
    name: 'Đakovački Kulin',
    img: '/images/proizvodi/kulin_1.webp',
    desc: 'Kralj slavonskog stola, poznat i kao kulen. Od birane svinjetine i leđne slanine, uz dodatak paprike, češnjaka i soli, nastaje delicija koja se polako dimi na bukovu drvu i dozrijeva najmanje 5 do 6 mjeseci. Punog okusa, plemenite arome i autentičnog slavonskog karaktera.',
    priceIds: ['kulin'],
  },
  {
    name: 'Đakovačka Kulinova Seka',
    img: '/images/proizvodi/seka.webp',
    desc: 'Tanja verzija kulina, jednako bogata okusom. Izrađena po istoj recepturi, punjena u tanje crijevo — savršena za svaki stol.',
    priceIds: ['kulinova-seka'],
  },
  {
    name: 'Đakovačka Kobasica',
    img: '/images/proizvodi/kobasica.webp',
    desc: 'Od biranog svježeg svinjskog mesa, uz skladan omjer slatke i ljute paprike, češnjaka i soli, nastaje kobasica punog okusa, profinjene arome i prepoznatljivog karaktera domaće slavonske kuhinje.',
    priceIds: ['kobasica-s-dima', 'kobasica-prosusena', 'kobasica-suha'],
    newSeason: true,
    note: 'Trenutno imamo dimljene kobasice za pečenje. Suhe kobasice očekujemo oko 10. prosinca.',
  },
  {
    name: 'Đakovačka Slanina',
    img: '/images/proizvodi/slanina.webp',
    desc: 'Dimljena svinjska slanina s tankim slojevima mesa. Bogata aromom dima, idealna uz domaći kruh ili kao dodatak jelima.',
    priceIds: ['slanina'],
  },
  {
    name: 'Đakovačka Buđola',
    img: '/images/proizvodi/budola.webp',
    desc: 'Suhomesnata delicija od svinjskog vrata, blage začinjenosti i fine teksture. Dugim zrenjem dobiva prepoznatljiv okus.',
    priceIds: ['vrat-budola'],
  },
  {
    name: 'Đakovačka Pečenica',
    img: '/images/proizvodi/pecenica.webp',
    desc: 'Dimljena svinjska pečenica — nježnog mesa i lagane, ugodne arome. Jedna od omiljenih slavonskih delicija.',
    priceIds: ['pecenica'],
  },
  {
    name: 'Đakovački Buncek',
    img: '/images/proizvodi/buncek.webp',
    desc: 'Klasik domaće slavonske kuhinje. Mesnat i sočan svinjski buncek pažljivo se soli i dimi kako bi dobio prepoznatljivu aromu i puni okus. Idealan je za polagano kuhanje ili pečenje, a posebno dobro pristaje uz kiseli kupus, grah i druga tradicionalna jela.',
    priceIds: ['buncek'],
  },
  {
    name: 'Đakovačka Špic rebra',
    img: '/images/proizvodi/spic-rebra.webp',
    desc: 'Pravi izbor za bogata domaća jela. Mesnata svinjska špic rebra pažljivo se sole i dime, čime dobivaju izraženu aromu i prepoznatljiv okus dima. Posebno su ukusna kuhana uz grah, kiseli kupus, ričet ili druga slavonska variva.',
    priceIds: ['spic-rebra'],
    newSeason: true,
  },
  {
    name: 'Đakovački Švargl',
    img: '/images/proizvodi/svargl.webp',
    desc: 'Tradicija koja se prepoznaje u svakom zalogaju. Priprema se prema tradicionalnoj recepturi od karakterističnih svinjskih dijelova, uz dodatak soli, papra, paprike i češnjaka. Punog je okusa, bogate domaće arome i prepoznatljivog presjeka koji ga čini pravim klasikom slavonskog stola.',
    priceIds: ['svargl'],
    newSeason: true,
  },
]

for (const item of catalog) {
  const unknown = item.priceIds.filter(id => !availability.has(id))
  if (unknown.length) {
    throw new Error(`catalog.js: "${item.name}" upućuje na nepostojeće id-jeve u products.json: ${unknown.join(', ')}`)
  }
}

export const siteProducts = catalog.map(item => ({
  ...item,
  available: item.priceIds.some(id => availability.get(id)),
}))
